cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-sqlcipher-adapter/www/SQLitePlugin.js",
        "id": "cordova-sqlcipher-adapter.SQLitePlugin",
        "pluginId": "cordova-sqlcipher-adapter",
        "clobbers": [
            "SQLitePlugin"
        ]
    },
    {
        "file": "plugins/es6-promise-plugin/www/promise.js",
        "id": "es6-promise-plugin.Promise",
        "pluginId": "es6-promise-plugin",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-sqlite/www/SQLitePlugin.js",
        "id": "cordova-plugin-sqlite.SQLitePlugin",
        "pluginId": "cordova-plugin-sqlite",
        "clobbers": [
            "window.sqlitePlugin",
            "cordova.plugins.sqlitePlugin"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.2.1",
    "cordova-sqlcipher-adapter": "0.1.5",
    "es6-promise-plugin": "3.0.2",
    "cordova-plugin-sqlite": "1.0.3"
}
// BOTTOM OF METADATA
});