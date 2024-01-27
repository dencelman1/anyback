

var data = [
    
]

var getEntries = (dbName, tableName) => {
    var db, table;
    
    db =
        data
        .filter(currentDb => currentDb?.name === dbName)
        [0]

    
    !db && data.push(
        db = {
            name: dbName,
            tables: [],
        }
    )
    
    table =
        db.tables
        .filter(currentTable => currentTable?.name === tableName)
        [0]
    
    !table && db.tables.push(
        table = {
            name: tableName,
            entries: [],
        }
    )

    return table.entries;
}

function filterByWhere(entries, where) {
    
    return (
        entries
        .filter(e => {
            if (!where)
                return true;

            for (var [key, value] of Object.entries(where)) {
                if (e[key] !== value)
                    return false;
            }
            return true;
        })
    )
}

function create(d, t, value) {
    getEntries(d, t)
    .push(value)
}

function read(d, t, where) {
    
    return (
        filterByWhere(
            getEntries(d, t),
            where,
        )
    )
}

function delete_(d, t, where) {
    var entries = getEntries(d, t)
    
    filterByWhere(entries, where)

    .map(e => entries.indexOf(e))
    .forEach(eIndex => {
        entries.splice(eIndex, 1);
    })

    return true
}

function update(
    d, t, value, where,
) {
    
    for (var e of filterByWhere(getEntries(d, t), where)) {
        for (var [key, updateValue] of Object.entries(value)) {
            if ( !( key in e ) )
                return false;
            
            e[key] = updateValue;
        }
    }

    return true

}



var LocalBackend = {
    create,
    read,
    delete_,
    update,
    generateId: () => ( new Date().getTime() ),

}

export default LocalBackend;
