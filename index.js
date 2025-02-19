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
    const { domain } = args;
    const spinner = yoctoSpinner({ text: `Check subdomains: ${domain}` });

    spinner.start();

    const res = await fetch(`https://crt.sh/json?q=${domain}`);

    if (!res.ok || res.headers.get("content-type") !== "application/json") {
      spinner.error("Failed to retrieve subdomains");
      return;
    }

    const issues = await res.json();
    const subDomains = getSubdomains(issues, domain);

    spinner.success(`Found ${subDomains.length} subdomains\n`);
    console.log(
      args.json ? JSON.stringify(subDomains, null, 2) : subDomains.join("\n")
    );
  },
});

runMain(main);

function getSubdomains(issues, domain) {
  return [
    ...new Set(
      issues
        .map((i) => i.common_name)
        .filter((common_name) => common_name.includes(domain))
        .filter((cn) => cn.split(".").length > 2 && !cn.startsWith("*."))
    ),
  ].sort();
}
