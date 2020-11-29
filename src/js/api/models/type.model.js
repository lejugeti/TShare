const sql = require('../../db.js');

// constructeur

const Type = function(type){
    this.idType = type.idType,
    this.label = type.label,
    this.idTypeParent = type.idTypeParent
};

Type.create = (newType, result) => {
    sql.query("INSERT INTO Type SET ?", newType, (err, res) => {
        if(err){
            console.log("error : ", err);
            result(err, null);
            return;
        }

        console.log("type créé : ", {idType: newType.idType, ...newType});
    })
};

Type.getAll = result => {
    sql.query("SELECT * FROM Type", (err, res) => {
        if(err){
            console.log("error : ", err);
            result(err, null);
            return;
        }

        console.log("types:", res);
        result(null, res);
        return;
    });
};

Type.findById = (id, result) => {
    sql.query("SELECT * FROM Type WHERE idType = ?", id, (err, res) => {
        if(err){
            console.log("error : ", err);
            result(err, null);
            return;
        }

        if(res.length){
            console.log("found type", res[0]);
            result(null, res[0]);
            return;
        }

        result({kind: "not_found"}, null);
    })
};

Type.updateById = (id, type, result) => {
    sql.query("UPDATE Type SET label=?, idTypeParent=? WHERE idType=?",
        [type.label, type.idTypeParent, id], 
        (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if(res.affectedRows == 0){
            result({kind: "not_found"}, null);
            return;
        }

        console.log("updated type:", {idType: id, ...type});
        result(null, {idType: id, ...type});  
            
        }
    );
};

Type.remove = (id, result) => {
    sql.query("DELETE FROM Type WHERE idType = ?", id, (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
        }

        if (res.affectedRows == 0) {
        // not found type with the id
        result({ kind: "not_found" }, null);
        return;
        }

        console.log("deleted type with id: ", id);
        result(null, res);
    });
};
  
Type.removeAll = result => {
    sql.query("DELETE FROM Type", (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
        }

        console.log(`deleted ${res.affectedRows} type`);
        result(null, res);
    });
};
  
  module.exports = Type;