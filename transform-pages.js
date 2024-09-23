const path = require('path');
class TransformPages {
    constructor(pagesPath = './src', config) {
        this.CONFIG = {
            includes: ['meta', 'path', 'aliasPath', 'name']
        };
        if (config && config.includes) {
            this.CONFIG.includes = Array.from(new Set([...this.CONFIG.includes, ...config.includes]));
        }
        this.pagesPath = path.resolve(process.cwd(), pagesPath);
        this.uniPagesJSON = require('@dcloudio/uni-cli-shared/dist/json/pages.js');
        this.platform = process.env['UNI_PLATFORM'];
        this.routes = this.getPagesRoutes().concat(this.getNotMpRoutes());
    }
    /**
     * 获取所有pages.json下的内容 返回json
     */
    get pagesJson() {
        return this.uniPagesJSON.parsePagesJson(this.pagesPath, this.platform);
    }
    /**
     * 通过读取pages.json文件 生成直接可用的routes
     */
    getPagesRoutes(pages = this.pagesJson.pages, rootPath = null) {
        const routes = [];
        for (let i = 0; i < pages.length; i++) {
            const item = pages[i];
            const route = {};
            for (let j = 0; j < this.CONFIG.includes.length; j++) {
                const key = this.CONFIG.includes[j];
                let value = item[key];
                if (key === 'path') {
                    value = rootPath ? `/${rootPath}/${value}` : `/${value}`;
                }
                if (key === 'aliasPath' && i == 0 && rootPath == null) {
                    route[key] = route[key] || '/';
                }
                else if (value !== undefined) {
                    route[key] = value;
                }
            }
            routes.push(route);
        }
        return routes;
    }
    /**
     * 解析小程序分包路径
     */
    getNotMpRoutes() {
        const { subPackages } = this.pagesJson;
        let routes = [], subPages, root, subRoutes;
        if (subPackages == null || subPackages.length == 0) {
            return [];
        }
        subPackages.forEach((item) => {
            subPages = item.pages;
            root = item.root;
            subRoutes = this.getPagesRoutes(subPages, root);
            routes = routes.concat(subRoutes);
        });
        return routes;
    }
}
export default TransformPages;