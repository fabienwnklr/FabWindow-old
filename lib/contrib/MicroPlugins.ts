/**
 * microplugin.js
 * Copyright (c) 2013 Brian Reavis & contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at:
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
 * ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 *
 * @author Brian Reavis <brian@thirdroute.com>
 */

type TSettings = {
	[key: string]: unknown
}

type TPlugins = {
	names: string[],
	settings: TSettings,
	requested: { [key: string]: boolean },
	loaded: { [key: string]: unknown }
};

export type TPluginItem = { name: string, options: object };
export type TPluginHash = { [key: string]: object };




export default function MicroPlugin(Interface: any) {

	Interface.plugins = {};

	return class extends Interface {

		public plugins: TPlugins = {
			names: [],
			settings: {},
			requested: {},
			loaded: {}
		};

		/**
		 * Registers a plugin.
		 *
		 * @param {string} name plugin name
		 * @param {function} fn
		 */
		static define(name: string, fn: (this: typeof MicroPlugin, settings: TSettings) => void) {
			Interface.plugins[name] = {
				'name': name,
				'fn': fn
			};
		}


		/**
		 * Initializes the listed plugins (with options).
		 * Acceptable formats:
		 *
		 * List (without options):
		 *   ['a', 'b', 'c']
		 *
		 * List (with options):
		 *   [{'name': 'a', options: {}}, {'name': 'b', options: {}}]
		 *
		 * Hash (with options):
		 *   {'a': { ... }, 'b': { ... }, 'c': { ... }}
		 *
		 * @param {array|object} plugins
		 */
		initializePlugins(plugins: string[] | TPluginItem[] | TPluginHash) {
			const queue: string[] = [];
			let key, name;

			if (Array.isArray(plugins)) {
				plugins.forEach((plugin: string | TPluginItem) => {
					if (typeof plugin === 'string') {
						queue.push(plugin);
					} else {
						this.plugins.settings[plugin.name] = plugin.options;
						queue.push(plugin.name);
					}
				});
			} else if (plugins) {
				for (key in plugins) {
					if (Object.prototype.hasOwnProperty.call(plugins, key)) {
						this.plugins.settings[key] = plugins[key];
						queue.push(key);
					}
				}
			}

			// eslint-disable-next-line no-cond-assign
			while (name = queue.shift()) {
				this.require(name);
			}
		}

		loadPlugin(name: string) {
			const plugins = this.plugins;
			const plugin = Interface.plugins[name];

			if (!Object.prototype.hasOwnProperty.call(Interface.plugins, name)) {
				throw new Error('Unable to find "' + name + '" plugin');
			}

			plugins.requested[name] = true;
			plugins.loaded[name] = plugin.fn.apply(self, [this.plugins.settings[name] || {}]);
			plugins.names.push(name);
		}

		/**
		 * Initializes a plugin.
		 *
		 */
		require(name: string) {
			const plugins = this.plugins;

			if (!Object.prototype.hasOwnProperty.call(this.plugins.loaded, name)) {
				if (plugins.requested[name]) {
					throw new Error('Plugin has circular dependency ("' + name + '")');
				}
				this.loadPlugin(name);
			}

			return plugins.loaded[name];
		}

	};

}