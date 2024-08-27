import config from "../configurations/config.json"

export function getChainName(chainId: number | undefined): string | undefined {
    // @ts-ignore
    return config.chains[chainId.toString()]
}