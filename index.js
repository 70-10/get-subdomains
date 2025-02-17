#!/usr/bin/env node
import { defineCommand, runMain } from "citty";
import yoctoSpinner from "yocto-spinner";

const main = defineCommand({
    meta: {
        name: "get-subdomains",
        description: "Get subdomains",
        version: "0.0.1",
    },
    args: {
        domain: {
            type: "positional",
            description: "Domain to get subdomains",
            required: true,
        },
        json: {
            type: "boolean",
            description: "Output as JSON",
            default: false,
        },
    },
    async run({ args }) {
        const spinner = yoctoSpinner({ text: `Check subdomains: ${args.domain}` });

        spinner.start();

        const res = await fetch(`https://crt.sh/?q=${args.domain}&output=json`);
        const issues = await res.json();
        const commonNames = [...new Set(issues.map((i) => i.common_name).filter(common_name => common_name.includes(args.domain)))];

        const subDomains = commonNames
            .filter((cn) => cn.split(".").length > 2 && !cn.startsWith("*."))
            .sort();

        spinner.success(`Found ${subDomains.length} subdomains\n`);
        console.log(
            args.json ? JSON.stringify(subDomains, null, 2) : subDomains.join("\n")
        );
    },
});

runMain(main);
