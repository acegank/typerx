"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_database_1 = require("./core.database");
const menu_dto_1 = require("./dto/menu.dto");
const menu_appearance_1 = require("./appearance/menu.appearance");
const lodash_1 = require("lodash");
const repository_1 = require("../../database/repository");
class MenuService {
    getAppearance() {
        return __awaiter(this, void 0, void 0, function* () {
            return menu_appearance_1.appearance;
        });
    }
    search(keyword, value, limit = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            return repository_1.Repository.search(core_database_1.CoreDatabase.Menu, keyword, value, '', limit);
        });
    }
    create(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = new core_database_1.CoreDatabase.Menu(entry);
            const result = yield doc.save();
            return result;
        });
    }
    update(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield core_database_1.CoreDatabase.Menu.findOneAndUpdate({
                _id: entry.id,
            }, entry).exec();
            return doc;
        });
    }
    query(keyword, isMenu, page, size, sort) {
        return __awaiter(this, void 0, void 0, function* () {
            const condition = keyword ? { name: new RegExp(keyword, 'i') } : {};
            if (isMenu)
                condition.isMenu = true;
            const query = core_database_1.CoreDatabase.Menu.find(condition).sort(sort);
            const collection = core_database_1.CoreDatabase.Menu.find(condition);
            return repository_1.Repository.query(query, collection, page, size, menu_dto_1.MenuResponseFields);
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return repository_1.Repository.remove(core_database_1.CoreDatabase.Menu, id);
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield repository_1.Repository.get(core_database_1.CoreDatabase.Menu, id, [
                {
                    path: 'roles',
                    select: 'name',
                },
            ]);
            return this.pure(result);
        });
    }
    pure(entry) {
        return lodash_1.pick(entry, [
            'id',
            'name',
            'slug',
            'group',
            'link',
            'externalLink',
            'blank',
            'icon',
            'order',
            'enable',
            'expanded',
            'acl',
            'permissions',
            'parent',
            'isMenu'
        ]);
    }
}
exports.MenuService = MenuService;
//# sourceMappingURL=menu.service.js.map