const StudHeaderModel = require('../models/stud-header-model');

class StudHeaderService {
    /** получить все записи из таблицы "proxyheaders" */
    async getAllRecords() {
        const list = await StudHeaderModel.findAll();
        return list;
    }

    /** получить одну запись по id из таблицы "proxyheaders" */
    async getOneRecord(recordId) {
        const record = await StudHeaderModel.findOne({ where: {id: recordId } });
        return record;
    }

    /** создать запись в таблице "proxyheaders" */
    async createRecord(payload) {
        const data = await StudHeaderModel.create(payload);
        return data;
    }

    /** обновить запись в таблице "proxyheaders" */
    async updateRecord(payload) {
        let record = await StudHeaderModel.findOne({ where: { id: payload.id } });
        record.number = payload?.number || record?.number;
        record.date1 = payload?.date1 || record?.date1;
        record.voditelId = payload?.voditelId || record?.voditelId;
        record.organizationId = payload?.organizationId || record?.organizationId;
        record.marka = payload?.marka || record?.marka;
        record.marshrut = payload?.marshrut || record?.marshrut;
        return await record.save();
    }

    /** удалить запись из таблицы "proxyheaders" */
    async removeRecord(recordId) {
        const record = await StudHeaderModel.destroy({ where: { id: recordId } });
        return record;
    }
}

module.exports = new StudHeaderService();