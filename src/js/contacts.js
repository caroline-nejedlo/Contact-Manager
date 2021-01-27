const apiUrl="http://localhost:8080/api/search.php";

// Event Listeners
document.getElementById("contact-search")
  .addEventListener("keyup", (e) => {
    updateTable(e.target.value);
  });

main();

async function main() {
  updateTable("");
}

async function getContacts(searchStr) {
  // Wait for response
  const response = await fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify({
      userId: 1,
      searchStr: searchStr
    })
  });

  // Convert response to string
  // Note: response.text() gives back a js object
  const data = await response.text();
  const obj = JSON.parse(data);
  
  return obj.table;
}

// Just creates table from js object
function tableToHTML(table) {
  let html = "<table>";
  html += "<tr><th>id</th><th>user id</th><th>first name</th><th>last name</th><th>phone</th><th>email</th><th>date created</th>";
  // output data of each row
  for(let row of table) {
    html += "<tr>";
    for (const key in row) {
      html += `<td>${row[key]}</td>`;
    }
    html += "</tr>";
  }
  html += "</table>";

  return html;
}

async function updateTable(searchStr) {
  const contactTable = await getContacts(searchStr);
  if (contactTable === null)
    return;

  const html = tableToHTML(contactTable);
  document.getElementById("contact-table").innerHTML = html;
}
