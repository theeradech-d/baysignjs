export type BAYSignV2Param = {
    [key: string]: any;
};
declare class BAYSignV2 {
    private BAY_PUBLIC_KEY;
    constructor(BAY_PUBLIC_KEY: any);
    /**
     * @description Create signature
     * @param {BAYSignV2Param} signData - Data for generate signature
     * @returns {Promise<string>} - signature
     */
    createSignature(signData: BAYSignV2Param): Promise<string>;
}
export default BAYSignV2;
