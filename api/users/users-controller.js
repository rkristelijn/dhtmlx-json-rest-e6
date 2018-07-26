const fs = require('fs');

let controller = (Model) => {
    let _getRoles = () => {
        let options = [];
        let data = fs.readFileSync('./api/seed-data/users-roles_en.txt', 'utf-8');
        let rows = data.split(/\r?\n/);
        for (let row of rows) {
            options.push({ id: row, value: row })
        }
        return options;
    }

    let _head = [
        { "id": "created", "value": "Created", "type": "ro", "width": "0", "align": "left", "sort": "str" },
        { "id": "updated", "value": "Updated", "type": "ro", "width": "0", "align": "left", "sort": "str" },
        { "id": "updatedBy", "value": "Updated By", "type": "ro", "width": "0", "align": "left", "sort": "str" },
        { "id": "createdBy", "value": "Updated By", "type": "ro", "width": "0", "align": "left", "sort": "str" },
        { "id": "username", "value": "Username", "type": "ed", "width": "100", "align": "left", "sort": "str" },
        { "id": "password", "value": "Password", "type": "ed", "width": "100", "align": "left", "sort": "str" },
        {
            "id": "roles", "value": "Roles", "type": "ro", "width": "100", "align": "left", "sort": "str",
            "options": _getRoles()
        },
        { "id": "endDate", "value": "End Date", "type": "dhxCalendarA", "width": "130", "align": "left", "sort": "date" },
        { "id": "info", "value": "Info", "type": "txttxt", "width": "*", "align": "left", "sort": "str" }
    ];

    let _readAll = (callback) => {
        Model.find({}, (err, rows) => {
            if (err) callback(err, null);
            else callback(null, { head: _head, rows: _toRows(rows) });
        });
    };
    let _updateOne = (id, data, callback) => {
        Model.findOneAndUpdate({ _id: id }, data, { new: true }, (err, row) => {
            if (err) callback(err, null);
            else callback(null, row);
        });

    };
    let _createOne = (data, callback) => {
        Model.create(data, (err, row) => {
            if (err) callback(err, null);
            else callback(null, row);
        });
    };
    let _deleteOne = (id, callback) => {
        Model.findByIdAndRemove({ _id: id }, (err) => {
            if (err) callback(err, null);
            else callback(null, null);
        });
    };
    let _nvl = (val) => {
        if(!val) return "";
        return val;
    }
    let _toRows = (rows) => {
        let result = [];
        for (row of rows) {
            result.push({
                id: row._id,
                data: [
                    row.created, 
                    row.updated, 
                    _nvl(row.createdBy), 
                    _nvl(row.updatedBy), 
                    _nvl(row.username), 
                    _nvl(row.password), 
                    _nvl(row.roles), 
                    _nvl(row.endDate),
                    _nvl(row.info)
                ]
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
