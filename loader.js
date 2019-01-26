const textBox = document.getElementById('textBox');
const submit = document.getElementById('submit');
const schemaArea = document.querySelector('.schema-area');

submit.addEventListener('click', (event) => {
  event.preventDefault();
  var schema = textBox.value;
  var tables = findTables(schema);

  for (var i = 0; i <= tables.length - 1; i++) {
    var match = tables[i].match(/".*"/)
    var tableName = match[0].replace(/"/g, '')
    schemaArea.insertAdjacentHTML('beforeend', table(tableName))

    var tBody = document.getElementById(`${tableName}Body`)
    var rows = tables[i].match(/t\..*[^\n]*/g)
    console.log(rows)
    for (var i = 0; i <= rows.length - 1; i++) {
      tBody.insertAdjacentHTML('beforeend', row(rows[i]))
    }
  };
});


const findTables = (schema) => {
  const tablesRegex = /create_table (((?!end).*)*\s*)*end/g;
  return schema.match(tablesRegex);
};

const table = (name) => {
  return `<table id='${name}'>\
            ${tableHead(name)}\
            <tbody id='${name}Body'>
            </tbody>\
          </table>`;
};

const row = (wholeThing) => {
  var type = wholeThing.match(/t\.\w*/)[0].substr(2);
  var rowName = wholeThing.match(/".*"/)[0].replace(/"/g, '')
  console.log(type, rowName)
  return `<tr class='${type}'>\
            <td>\
              ${rowName}\
            </td>\
          </tr>`;
};

const tableHead = (name) => {
  return `<thead>\
            <tr>\
              <th>\
                ${name}\
              </th>\
            </tr>\
          </thead>`
};
