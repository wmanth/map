// see https://github.com/alex3165/react-mapbox-gl/issues/931#issuecomment-826135957
module.exports = {
	babel: {
		loaderOptions: {
			ignore: ["./node_modules/mapbox-gl/dist/mapbox-gl.js"],
		},
	},
};
