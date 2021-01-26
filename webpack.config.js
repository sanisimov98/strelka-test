module.exports = {
    module: {
        rules: [
            {
                test: /\breact-mapbox-gl-csp-worker.js\b/i,
                use: { loader: "worker-loader" },
            },
        ],
    },
};
