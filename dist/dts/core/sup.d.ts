/**
 * We're going to be calling this semi-frequently.
 * Turbofan should kick in and optimize this away.
 */
export declare const identity: <T>(x: T) => T;
declare global {
    interface Document {
    }
}
export type in_browser = keyof globalThis.Document extends never ? false : true;
export type if_in_browser<a, b> = in_browser extends true ? a : b;
export type $extends<parent, child> = child extends parent ? true : false;
/** it prints strings as strings */
export declare function dbg_str(any: any): string;
/**
 * Stops unions of specific types collapsing into their parent type.
 * This helps with editor support.
 * @example
 * ```ts
 * type $123 = 1 | 2 | 3;
 * type bad  = $123 | number; //:: number
 * type good = $123 | (number & no_collapse) //:: 1 | 2 | 3 & (number & no_collapse)
 * ```
 */
export type no_collapse = {};
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
export declare function UNSOUND_is_now<T>(val: any): asserts val is T;
export declare const UNSOUND_cast: {
    <T>(val: any): T;
};
export declare const UNSOUND_bless: <T>(val: any) => T;
export declare const UNSOUND_shut_up: {
    (who_cares: any): never;
};
export declare const UNSOUND_unlock: {
    (fuck_off: any): any;
};
/**
 * Compiletime newtype property holder.
 * Exported because the typescript compiler needs to be able to refer to this
 * fake symbol inter-module.
 *
 * Search for errors like "cannot be named" to understand why this needs to
 * happen.
 */
export declare const nt_s: unique symbol;
/** Unwrap a newtype to it's underlaying javascript type. */
export type unwrap<T> = T extends {
    [nt_s]: {
        unwraps_to: infer inner;
    };
} ? inner : T;
export type newtype<uniq_name extends string, of> = of & {
    [nt_s]: {
        types: {
            [key in uniq_name]: void;
        };
        unwraps_to: unwrap<of>;
    };
};
declare const unsatisfiable: unique symbol;
type unsatisfiable = typeof unsatisfiable;
export type satisfies<cond extends boolean> = cond extends true ? never : unsatisfiable;
/**
 * When we assert that things are of a certain type, it's useful to know what
 * the actual name of the type is. Unfortunately with assertion functions, we
 * have to stutter. The type on the constant needs to be explicit for some inane
 * reason.
 */
export type assert_obj<T> = {
    assert(u: unknown): asserts u is T;
    typename: string;
};
export type tuple<T = any> = readonly [...T[]];
export type tuple_includes<elem, tup extends readonly [...any[]]> = elem extends tup[number] ? true : false;
export declare function tuple_includes<T, tup extends tuple>(tup: tup, elem: T): T extends tup[number] ? true : false;
export declare const tuple_to_array: {
    <T, tup extends readonly [...T[]]>(tup: tup): readonly T[];
};
/**
 * See below.
 */
export declare function tuple_assert_in<T, tup extends tuple<T>, typename extends string>(tup: tup, name: typename, elem: T): asserts elem is tup[number];
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
export declare function tuple_make_assert_in<T, tup extends tuple<T>, typename extends string>(tup: tup, name: typename): assert_obj<tup[number]>;
/** This does exactly what you'd think `Object.keys` would. */
export declare function object_keys<o extends {}>(o: o): readonly (keyof o)[];
/** Either asserts u is {} or transforms null | undefined into {} */
export declare function object_from(u: unknown): {};
export declare function object_is(u: unknown): u is {};
export declare const assert_object: assert_obj<{}>;
type key = keyof any;
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
export declare const object_hop: <k extends string | number | symbol, o extends {}>(k: k, o: o) => o is o & { [key_1 in k]: unknown; };
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
export declare function object_has<k extends key, o extends {}>(k: k, o: o): asserts o is o & {
    [key in k]: unknown;
};
/** Assert that an object has a property of type T. */
export declare function object_has_t<T, k extends key, o extends {}>(k: k, assert: assert_obj<T>, o: o): asserts o is o & {
    [key in k]: T;
};
export declare function object_has_v<k extends key, v extends any, o extends {}>(k: k, v: v, o: o): asserts o is o & {
    [key in k]: v;
};
/**
 * Assert that an object has an *optional* property of type T.
 * If the property does not exist, the T.assert function is not run.
 */
export declare function object_optional_t<T, k extends key, o extends {}>(k: k, assert: assert_obj<T>, o: o): asserts o is o & {
    [key in k]?: T;
};
/**
 * For cases like window.ethereum which is a Proxy, Object.hasOwnProperty
 * will return false even when the Proxy can respond to a get request.
 * For cases like these, we have to use this function. It's identical to
 * has but it uses the JavaScript in operator which is correctly trapped by
 * the Metamask Proxy.
 */
export declare function object_$in<k extends key, o extends {}>(k: k, o: o): asserts o is o & {
    [key in k]: unknown;
};
export declare function object_$in_t<T, k extends key, o extends {}>(k: k, assert: assert_obj<T>, o: o): asserts o is o & {
    [key in k]: T;
};
export declare function object_freeze<T>(obj: T): asserts obj is Readonly<T>;
/**
 * Give an object a default property if doesn't have one already
 */
export declare function object_$default<T, k extends key, o extends {
    [s in k]?: T;
}>(k: k, default_val: T, o: o): asserts o is o & {
    [key in k]: T;
};
type any_key<of extends {}> = of extends any ? keyof of : never;
export declare function object_filter_keys_by_prop<o extends {}, k extends any_key<o[keyof o]>, match>(o: o, k: k, match: match): readonly {
    [i in keyof o]: o[i] extends {
        [key in k]: match;
    } ? i : never;
}[keyof o][];
export type any_fn = (...args: any[]) => any;
export declare const assert_any_fn: assert_obj<any_fn>;
export declare const assert_bool: assert_obj<boolean>;
export declare const assert_string: assert_obj<string>;
export declare const assert_number: assert_obj<number>;
export type uint = newtype<"uint", number>;
export declare const assert_uint: assert_obj<uint>;
export declare function uint_from(u: unknown): uint;
export declare function uint_to_ufloat_from_decimals(value: uint, decimals: uint): ufloat;
export type ufloat = newtype<"ufloat", number>;
export declare const assert_ufloat: assert_obj<ufloat>;
export declare const assert_array: assert_obj<unknown[]>;
export declare function assert_array_t<T>(assert: assert_obj<T>): assert_obj<T[]>;
export declare const assert_array_singleton: assert_obj<[unknown]>;
export declare function assert_array_singleton_t<T>(assert: assert_obj<T>): assert_obj<[T]>;
export declare function array_push<T>(ary: T[], val: T): void;
export declare function array_pop_at<T>(idx: number, ary: T[]): T;
export declare function array_remove(ary: any[], val: any): boolean;
export declare function array_includes(ary: any[], val: any): boolean;
export {};
