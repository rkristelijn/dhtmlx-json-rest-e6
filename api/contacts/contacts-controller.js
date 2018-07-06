let contactsController = (Model) => {
  // hardcoded header
  let _head = [
    {
      "width": "55",
      "id": "photo",
      "type": "ro",
      "align": "center",
      "sort": "str",
      "value": "<span style='padding/left:60px;'>Name</span>"
    },
    {
      "width": "100",
      "id": "name",
      "type": "ed",
      "align": "left",
      "sort": "str",
      "value": "#cspan"
    },
    {
      "width": "100",
      "id": "dob",
      "type": "dhxCalendarA",
      "align": "left",
      "sort": "date",
      "value": "Date of Birth"
    },
    {
      "width": "130",
      "id": "pos",
      "type": "coro",
      "align": "left",
      "sort": "str",
      "value": "Position"
    },
    {
      "width": "170",
      "id": "email",
      "type": "ed",
      "align": "left",
      "sort": "na",
      "value": "E/mail Address"
    },
    {
      "width": "100",
      "id": "phone",
      "type": "ed",
      "align": "left",
      "sort": "na",
      "value": "Phone"
    },
    {
      "width": "150",
      "id": "company",
      "type": "ed",
      "align": "left",
      "sort": "str",
      "value": "Company"
    },
    {
      "width": "*",
      "id": "info",
      "type": "txttxt",
      "align": "left",
      "sort": "na",
      "value": "Additional"
    }
  ];

  // just find all data in table
  let _readAll = (callback) => {
    Model.find({}, (err, contacts) => {
      if (err) callback(err, null);
      else callback(null, { head: _head, rows: _toRows(contacts) });
    });
  };

  // find one and update with one atomic operation, forcing the altered document to return
  let _updateOne = (id, data, callback) => {
    Model.findOneAndUpdate({ _id: id }, data, { new: true }, (err, contact) => {
      if (err) callback(err, null);
      else callback(null, contact);
    });
  };

  let _createOne = (data, callback) => {
    if(!data.photo) data.photo = `<img src='codebase/imgs/contacts/small/some-one${Math.floor(Math.random() * 10)}.png' border='0' class='contact_photo' height='40' width='40'>`;
    if(!data.dob) data.dob = '01/01/1991';
    if(!data.pos) data.pos = 'Chief Engineer';
    if(!data.name) data.name = 'Hello World';
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

  // create {id:x,data:[y,z,...]} from {_id:x,y:'',z:''}
  let _toRows = (rows) => {
    let result = [];
    for (row of rows) {
      result.push({
        id: row._id, data: [row.photo, row.name, row.dob, row.pos, row.email, row.phone, row.company, row.info]
      });
    }
    return result;
  };

  // revealing model pattern, not revealing _toRows()
  return {
    readAll: _readAll,
    updateOne: _updateOne,
    createOne: _createOne,
    deleteOne: _deleteOne
  };
}

module.exports = contactsController;
