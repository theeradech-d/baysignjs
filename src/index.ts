import * as path from "path";

const { spawn } = require("child_process");

export type BAYSignV2Param = {
    [key: string]: any;
};

class BAYSignV2 {
    private BAY_PUBLIC_KEY = "";

    constructor(BAY_PUBLIC_KEY) {
        this.BAY_PUBLIC_KEY = BAY_PUBLIC_KEY;
    }

    /**
     * @description Create signature
     * @param {BAYSignV2Param} signData - Data for generate signature
     * @returns {Promise<string>} - signature
     */
    createSignature(signData: BAYSignV2Param): Promise<string> {
        const data = JSON.stringify(signData);
        const jar = path.join(__dirname, "..",  "sprbaysign-2.0-jar-with-dependencies.jar")
        return new Promise((resolve, reject) => {
            const jsonString = data;
            const javaProcess = spawn("java", [
                "-jar",
                jar,
                this.BAY_PUBLIC_KEY,
                jsonString,
            ]);

            let output = "";
            let error = "";

            javaProcess.stdout.on("data", (data) => {
                output += data.toString();
            });

            javaProcess.stderr.on("data", (data) => {
                error += data.toString();
            });

            javaProcess.on("close", (code) => {
                if (code === 0) {
                    resolve(output.trim());
                } else {
                    reject(`Java process exited with code ${code}: ${error}`);
                }
            });
        });
    }
}

export default BAYSignV2;
