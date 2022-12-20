import * as sup from "./sup";
/** apy type to action class */
// NOTE(Marcus): remove action class
export const apy_info = {
    lend: "lending",
    borrow: "lending",
    stake: "staking",
    yield: "yielding",
};
sup.object_freeze(apy_info);
void apy_info;
const apy_types = sup.object_keys(apy_info);
export const assert_apy_type = sup.tuple_make_assert_in(apy_types, "apy_type");
