const childProcess = require("child_process")

const getLatestGitCommitHash = (format = "long") => {
    return childProcess
        .execSync(`git rev-parse ${format === "short" ? "--short" : ""} HEAD`)
        .toString()
        .trim()
}

module.exports = () => {
    const latestGitCommitHash = getLatestGitCommitHash("short")

    return {
        env: process.env.ELEVENTY_ENV,
        timestamp: new Date(),
        hash: latestGitCommitHash
    }
}
