"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.array_includes = exports.array_remove = exports.array_pop_at = exports.array_push = exports.assert_array_singleton_t = exports.assert_array_singleton = exports.assert_array_t = exports.assert_array = exports.assert_ufloat = exports.uint_to_ufloat_from_decimals = exports.uint_from = exports.assert_uint = exports.assert_number = exports.assert_string = exports.assert_bool = exports.assert_any_fn = exports.object_filter_keys_by_prop = exports.object_$default = exports.object_freeze = exports.object_$in_t = exports.object_$in = exports.object_optional_t = exports.object_has_v = exports.object_has_t = exports.object_has = exports.object_hop = exports.assert_object = exports.object_is = exports.object_from = exports.object_keys = exports.tuple_make_assert_in = exports.tuple_assert_in = exports.tuple_to_array = exports.tuple_includes = exports.UNSOUND_unlock = exports.UNSOUND_shut_up = exports.UNSOUND_bless = exports.UNSOUND_cast = exports.UNSOUND_is_now = exports.dbg_str = exports.identity = void 0;
// type support
// things in here are not very understandable or readable because of their
// abstract nature. I will do my best to explain what each thing is meant for.
const err_1 = require("./err");
/* BEGIN UTIL *****************************************************************/
/**
 * We're going to be calling this semi-frequently.
 * Turbofan should kick in and optimize this away.
 */
const identity = (x) => x;
exports.identity = identity;
/** it prints strings as strings */
function dbg_str(any) {
    if (typeof any === "string") {
        return `"${any}"`;
    }
    return "" + any;
}
exports.dbg_str = dbg_str;
/**
 * Sometimes typescript is too dumb to figure out that you have proven something
 * to be a certain type. But that's okay, we can just say that it is. I highly
 * discourage using this function since it's even less typesound than casting.
 *
 * @example
 * ```ts
 * declare const u: unknown;
 * UNSOUND_is_now<number>(u);
 * u + 1;
 * ```
 */
/* END UTIL *******************************************************************/
/* BEGIN UNSOUND **************************************************************/
// When TypeScript is too stupid to figure out that something is definitely true
function UNSOUND_is_now(val) { void val; }
exports.UNSOUND_is_now = UNSOUND_is_now;
exports.UNSOUND_cast = exports.identity;
// Blessing something makes it of that type by definition. Should really only
// be used with newtypes.
exports.UNSOUND_bless = exports.UNSOUND_cast;
// When you need the type system to fuck off and let you do what you want with
// a value. Usually you want to use this one from the "insertion" side of
// expressions.
exports.UNSOUND_shut_up = exports.identity;
// Same thing as above but for the "receiving" side of expressions. Arguments
// have the right type but the function refuses em? UNSOUND_unlock's your Go-To.
exports.UNSOUND_unlock = exports.identity;
// NOTE(Cole)
// Weird function signature. Let's swap the arguments.
function tuple_includes(tup, elem) {
    return (0, exports.UNSOUND_shut_up)(tup.includes(elem));
}
exports.tuple_includes = tuple_includes;
exports.tuple_to_array = exports.identity;
/**
 * See below.
 */
function tuple_assert_in(tup, name, elem) {
    if (tup.includes(elem)) { }
    else {
        throw new err_1.AxelTypeError([
            `Could not assert that input is a ${name}!`,
            `elem was ${dbg_str(elem)} but should have been one of the following:`,
            ...tup.map(e => `- ${dbg_str(e)}`),
        ]);
    }
}
exports.tuple_assert_in = tuple_assert_in;
/**
 * Given a tuple and a type name, returns an assertion function.
 * There are a lot of const tuples and it would be such a pain to write each
 * individual assertion out. An assertion error from a tuple looks like this:
 *
 * @example
 * ```txt
 * Could not assert that input is a cat_breed!
 * elem was "tiger" but should have been one of the following:
 * - "tabby"
 * - "pallas"
 * - "maine coon"
 * - "norwegian forest"
 * ```
 *
 * How to use this function with a constant tuple correctly:
 * ```ts
 * const cat_breeds = [
 *    "tabby",
 *    "pallas",
 *    "maine coon",
 *    "norwegian forest",
 * ] as const;
 * object.freeze(cat_breeds);
 * type cat_breed = typeof cat_breeds[number];
 * const assert_cat_breed: assert_obj<cat_breed> =
 *    tuple_make_assert_in(cat_breeds, "cat_breed");
 * ```
 */
function tuple_make_assert_in(tup, name) {
    return {
        assert(u) {
            tuple_assert_in(tup, name, u);
        },
        typename: name,
    };
}
exports.tuple_make_assert_in = tuple_make_assert_in;
/** This does exactly what you'd think `Object.keys` would. */
function object_keys(o) {
    const ks = Object.keys(o);
    object_freeze(ks);
    return (0, exports.UNSOUND_shut_up)(ks);
}
exports.object_keys = object_keys;
/** Either asserts u is {} or transforms null | undefined into {} */
function object_from(u) {
    // NOTE(Marcus): refactor to remove UNSOUND using explicit null if clause
    u !== null && u !== void 0 ? u : (u = {});
    if (typeof u !== "object") {
        throw new err_1.AxelTypeError([
            "Could not assert that value is non-null object because of runtime type mismatch!",
            `typeof value was ${dbg_str(typeof u)} instead of "object".`,
        ]);
    }
    return (0, exports.UNSOUND_shut_up)(u);
}
exports.object_from = object_from;
function object_is(u) {
    return typeof u === "object" && u !== null;
}
exports.object_is = object_is;
exports.assert_object = {
    assert(u) {
        if (typeof u !== "object") {
            throw new err_1.AxelTypeError([
                "Could not assert that value is non-null object because of runtime type mismatch!",
                `typeof value was ${dbg_str(typeof u)} instead of "object".`,
            ]);
        }
        if (u === null) {
            throw new err_1.AxelTypeError([
                "Could not assert that value is non-null object because value was null!",
            ]);
        }
    },
    typename: "non-null object",
};
/**
 * Type guarded Object.hasOwnProperty.
 *
 * @example
 * ```ts
 * if (hop("ethereum", window)) {
 *    console.log(window.ethereum); // no error!
 *    window.ethereum //:: unknown
 * } else {
 *    // but this would error if we uncommented it
 *    //console.log(window.ethereum)
 * }
 * ```
 * In the above example, `window.ethereum` is of type `unknown`. If you
 * wanted it to have some type, you should use `object.has_t`.
 */
const object_hop = (k, o) => Object.hasOwnProperty.call(o, k);
exports.object_hop = object_hop;
/**
 * Assert that an object has a key. Kinda similar to `object.hop` but it's
 * an assertion. You can think of it kind of like only having the `true`
 * branch of `object.hop` but it's the entire rest of the scope. If you want
 * to access the `false` branch, use try-catch.
 *
 * @example
 * ```ts
 * object.has("ethereum", window);
 * console.log(window.ethereum); // no error!
 * window.ethereum //:: unknown
 * ```
 * Just like with `object.hop`, `window.ethereum` is of type `unknown`. If
 * you wanted it to have some type, you should use `object.has_t`.
 */
function object_has(k, o) {
    if ((0, exports.object_hop)(k, o)) { }
    else {
        throw new err_1.AxelTypeError([
            `Object did not have key ${dbg_str(k)}! Object was ${JSON.stringify(o)}`,
        ]);
    }
}
exports.object_has = object_has;
/** Assert that an object has a property of type T. */
function object_has_t(k, assert, o) {
    object_has(k, o);
    try {
        assert.assert(o[k]);
    }
    catch (e) {
        if (e instanceof err_1.AxelTypeError) {
            throw new err_1.AxelTypeError([
                `While asserting that object[${dbg_str(k)}] is of type ${assert.typename}`,
                "an error was thrown:",
                e,
            ]);
        }
        else {
            throw e;
        }
    }
}
exports.object_has_t = object_has_t;
function object_has_v(k, v, o) {
    object_has(k, o);
    if (o[k] === v) { }
    else {
        throw new err_1.AxelTypeError([
            `Could not assert that object[${dbg_str(k)}] === ${v}:`,
            `object[${dbg_str(k)}] was not ${v} but instead ${o[k]}`,
        ]);
    }
}
exports.object_has_v = object_has_v;
/**
 * Assert that an object has an *optional* property of type T.
 * If the property does not exist, the T.assert function is not run.
 */
function object_optional_t(k, assert, o) {
    if ((0, exports.object_hop)(k, o)) {
        try {
            assert.assert(o[k]);
        }
        catch (e) {
            if (e instanceof err_1.AxelTypeError) {
                throw new err_1.AxelTypeError([
                    `While asserting that object[${dbg_str(k)}] has optional value of type ${assert.typename}`,
                    "an error was thrown:",
                    e,
                ]);
            }
        }
    }
}
exports.object_optional_t = object_optional_t;
/**
 * For cases like window.ethereum which is a Proxy, Object.hasOwnProperty
 * will return false even when the Proxy can respond to a get request.
 * For cases like these, we have to use this function. It's identical to
 * has but it uses the JavaScript in operator which is correctly trapped by
 * the Metamask Proxy.
 */
function object_$in(k, o) {
    if (k in o) { }
    else {
        throw new err_1.AxelTypeError([
            `${dbg_str(k)} was not in Object!`,
        ]);
    }
}
exports.object_$in = object_$in;
function object_$in_t(k, assert, o) {
    object_$in(k, o);
    try {
        assert.assert(o[k]);
    }
    catch (e) {
        if (e instanceof err_1.AxelTypeError) {
            throw new err_1.AxelTypeError([
                `While asserting that object[${dbg_str(k)}] is of type ${assert.typename}`,
                "an error was thrown:",
                e,
            ]);
        }
        else {
            throw e;
        }
    }
}
exports.object_$in_t = object_$in_t;
function object_freeze(obj) {
    Object.freeze(obj);
}
exports.object_freeze = object_freeze;
/**
 * Give an object a default property if doesn't have one already
 */
function object_$default(k, default_val, o) {
    if ((0, exports.object_hop)(k, o)) { }
    else {
        o[k] = (0, exports.UNSOUND_shut_up)(default_val);
    }
}
exports.object_$default = object_$default;
function object_filter_keys_by_prop(o, k, match) {
    return (0, exports.UNSOUND_shut_up)(object_keys(o).filter(i => o[i][k] === (0, exports.UNSOUND_shut_up)(match)));
}
exports.object_filter_keys_by_prop = object_filter_keys_by_prop;
exports.assert_any_fn = {
    assert(u) {
        if (typeof u !== "function") {
            throw new err_1.AxelTypeError([
                "Could not assert that value is function because",
                `typeof value was ${dbg_str(typeof u)} instead of "function"!`,
            ]);
        }
    },
    typename: "any_fn",
};
exports.assert_bool = {
    assert(u) {
        if (typeof u !== "boolean") {
            throw new err_1.AxelTypeError([
                "Could not assert that value is boolean because",
                `typeof value was ${dbg_str(typeof u)} instead of "boolean"!`,
            ]);
        }
    },
    typename: "boolean",
};
exports.assert_string = {
    assert(u) {
        if (typeof u !== "string") {
            throw new err_1.AxelTypeError([
                "Could not assert that value is string because",
                `typeof value was ${dbg_str(typeof u)} instead of "string"!`,
            ]);
        }
    },
    typename: "string",
};
exports.assert_number = {
    assert(u) {
        if (typeof u !== "number") {
            throw new err_1.AxelTypeError([
                "Could not assert that value is number because",
                `typeof value was ${dbg_str(typeof u)} instead of "number"!`,
            ]);
        }
        if (Number.isNaN(u)) {
            throw new err_1.AxelTypeError([
                "Could not assert that value is number because value was NaN!",
            ]);
        }
    },
    typename: "number",
};
exports.assert_uint = {
    assert(u) {
        if (Number.isInteger(u)) { }
        else {
            throw new err_1.AxelTypeError([
                "Could not assert that value is uint because value was not an integer!",
                `Value was ${u}.`,
            ]);
        }
        // too dumb to figure out that u is a number
        UNSOUND_is_now(u);
        if (u < 0) {
            throw new err_1.AxelTypeError([
                "Could not assert that value is uint because value was negative!",
                `Value was ${u}.`,
            ]);
        }
    },
    typename: "uint",
};
function uint_from(u) {
    exports.assert_uint.assert(u);
    return u;
}
exports.uint_from = uint_from;
function uint_to_ufloat_from_decimals(value, decimals) {
    return (0, exports.UNSOUND_shut_up)(value / 10 ** decimals);
}
exports.uint_to_ufloat_from_decimals = uint_to_ufloat_from_decimals;
exports.assert_ufloat = {
    assert(u) {
        if (typeof u !== "number") {
            throw new err_1.AxelTypeError([
                "Could not assert that value is ufloat because",
                `typeof value was ${dbg_str(typeof u)} instead of "number"!`,
            ]);
        }
        if (Number.isNaN(u)) {
            throw new err_1.AxelTypeError([
                "Could not assert that value is ufloat because value is NaN!",
            ]);
        }
        if (Number.isFinite(u)) { }
        else {
            throw new err_1.AxelTypeError([
                `Could not assert that value is ufloat because value is ${u}`,
            ]);
        }
        if (u < 0) {
            throw new err_1.AxelTypeError([
                "Could not assert that value is ufloat because value is negative!",
                `Value was ${u}`,
            ]);
        }
    },
    typename: "ufloat",
};
exports.assert_array = {
    assert(u) {
        if (Array.isArray(u)) { }
        else {
            throw new err_1.AxelTypeError([
                "Could not assert that value is an array!",
            ]);
        }
    },
    typename: "array",
};
function assert_array_t(assert) {
    return {
        assert(u) {
            exports.assert_array.assert(u);
            u.forEach(assert.assert);
        },
        typename: `array of ${assert.typename}`,
    };
}
exports.assert_array_t = assert_array_t;
exports.assert_array_singleton = {
    assert(u) {
        exports.assert_array.assert(u);
        if (u.length === 1) { }
        else {
            throw new err_1.AxelTypeError([
                "Could not assert that array is singleton:",
                `array.length was ${u.length} when it should have been 1`,
            ]);
        }
    },
    typename: "singleton",
};
function assert_array_singleton_t(assert) {
    return {
        assert(u) {
            exports.assert_array_singleton.assert(u);
            assert.assert(u[0]);
        },
        typename: `singleton of ${assert.typename}`,
    };
}
exports.assert_array_singleton_t = assert_array_singleton_t;
function array_push(ary, val) {
    ary.push(val);
}
exports.array_push = array_push;
function array_pop_at(idx, ary) {
    return ary.splice(idx, 1)[0];
}
exports.array_pop_at = array_pop_at;
function array_remove(ary, val) {
    const idx = ary.indexOf(val);
    if (idx === -1) {
        return false;
    }
    else {
        array_pop_at(idx, ary);
        return true;
    }
}
exports.array_remove = array_remove;
function array_includes(ary, val) {
    return ary.includes(val);
}
exports.array_includes = array_includes;
/* END BASIC TYPE SUPPORT *****************************************************/
