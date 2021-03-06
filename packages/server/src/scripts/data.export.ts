import { connect } from "./../database/connector";
import { MONGODB_URI } from "./../util/secrets";
import { connection, model, Document, Model } from 'mongoose';

connect(MONGODB_URI);
import { writeFileSync } from 'fs';
import { CoreDatabase as Db } from "../modules/core/core.database";

function save2File(file: string, data: object) {
    writeFileSync(`data/export.${file}.json`, JSON.stringify(data));
}

async function exportData() {

    const accounts = await Db.Account.find().exec();
    save2File('accounts', accounts.map((item) => {
        return {
            _id: item._id,
            username: item.username,
            nick: item.nick,
            password: item.password,
            avatar: item.avatar,
            type: item.type,
            email: item.email,
            mobile: item.mobile,
            roles: item.roles,
            groups: item.groups,
            isDisable: item.isDisable,
            isAdmin: item.isAdmin,
            isApproved: item.isApproved,
            secret: item.secret,
            expired: item.expired
        }
    }));

    const dicts = await Db.Dict.find().exec();
    save2File('dicts', dicts.map((item) => {
        return {
            _id: item._id,
            category: item.category,
            name: item.name,
            translate: item.translate,
        }
    }));

    const menus = await Db.Menu.find().exec();
    save2File('menus', menus.map((item) => {
        return {
            _id: item._id,
            name: item.name,
            parent: item.parent,
            paths: item.paths,
            order: item.order,
            isMenu: item.isMenu,
            link: item.link,
            slug: item.slug,
            externalLink: item.externalLink,
            blank: item.blank,
            icon: item.icon,
            enable: item.enable,
            permissions: item.permissions
        }
    }));

    const settings = await Db.Setting.find().exec();
    save2File('settings', settings.map((item) => {
        return {
            _id: item._id,
            name: item.name,
            key: item.key,
            value: item.value,
            description: item.description
        }
    }));

    console.log('export data done....');
}

exportData()