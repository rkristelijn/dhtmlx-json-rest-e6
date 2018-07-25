let controller = (Model) => {
    let _head = [
        { "id": "created", "value": "Created", "type": "ro", "width": "0", "align": "left", "sort": "str" },
        { "id": "name", "value": "Story", "type": "ed", "width": "100", "align": "left", "sort": "str" },
        { "id": "status", "value": "Status", "type": "co", "width": "100", "align": "left", "sort": "str" },
        { "id": "due", "value": "Due", "type": "dhxCalendarA", "width": "130", "align": "left", "sort": "date" },
        { "id": "desc", "value": "Description", "type": "txttxt", "width": "*", "align": "left", "sort": "str" }
    ];

    let _readAll = (callback) => {
        Model.find({}, (err, contacts) => {
            if (err) callback(err, null);
            else callback(null, { head: _head, rows: _toRows(contacts) });
        });
    };
    let _updateOne = (id, data, callback) => {
        Model.findOneAndUpdate({ _id: id }, data, { new: true }, (err, contact) => {
            if (err) callback(err, null);
            else callback(null, contact);
        });
    };
    let _createOne = (data, callback) => {
        if (!data.name) data.name = 'Hello World';
        if (!data.status) data.status = 'New';
        if (!data.due) data.due = '01/01/1991'; //todo two weeks from now
        Model.create(data, (err, contact) => {
            if (err) callback(err, null);
            else callback(null, contact);
        });
    };
    let _deleteOne = (id, callback) => {
        Model.findByIdAndRemove({ _id: id }, (err) => {
            if (err) callback(err, null);
            else callback(null, null);
        });
    };
    let _toRows = (rows) => {
        let result = [];
        for (row of rows) {
            result.push({
                id: row._id, data: [row.created, row.name, row.status, row.due, row.desc]
            });
        }
        return result;
    };

    return {
        readAll: _readAll,
        updateOne: _updateOne,
        createOne: _createOne,
        deleteOne: _deleteOne
    };
}

module.exports = controller;
