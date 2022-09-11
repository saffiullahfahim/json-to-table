// Initial Variables

// function getJson() {
//   fetch("https://raturi.in/documents/1/jsonformatter.json")
//     .then((response) => {
//       return response.json();
//     })
//     .then((jsondata) => {
//       PLAN_JSON = filter_plans(jsondata.Plans);
//       PLAN_FORMATTED = parse_plan_structure();
//       // available_plans = parse_plans();

//       populatePlanTable();
//     });
// }

// for local file
function getJson() {
  fetch("./assets/jsonformatter.json")
    .then((response) => {
      return response.json();
    })
    .then((jsondata) => {
      PLAN_JSON = filter_plans(jsondata.Plans);
      PLAN_JSON = PLAN_JSON.sort((a, b) => {
        let x = a.Name.toLowerCase();
        let y = b.Name.toLowerCase();
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      });
      PLAN_FORMATTED = parse_plan_structure();

      //console.log(PLAN_JSON);
      // available_plans = parse_plans();

      populatePlanTable();
    });
}

function parse_plans() {
  let plans = [];
  for (let i = 0; i < PLAN_JSON.length; i++) {
    plans.push(PLAN_JSON[i].Name);
  }
  return plans;
}

function filter_plans(plans) {
  if (selected_plans === "undefined" || !selected_plans) {
    selected_plans = available_plans;
  }
  return plans.filter((obj) => selected_plans.indexOf(obj.Name) != -1);
}

function parse_plan_structure() {
  let new_plans = {};
  for (let i = 0; i < PLAN_JSON.length; i++) {
    let plan = PLAN_JSON[i];
    new_plans_name.push(plan.Name);

    for (let j = 0; j < PLAN_JSON[i]["Benefits"].length; j++) {
      let benefit = PLAN_JSON[i][["Benefits"]][j];
      let key = benefit.Name;
      if (key in new_plans) {
        new_plans[key].push({
          description: benefit.Description,
          plan_name: plan.Name,
          value: benefit.Detail,
        });
      } else {
        new_plans[key] = [
          {
            description: benefit.Description,
            plan_name: plan.Name,
            value: benefit.Detail,
          },
        ];
        PLAN_DESCRIPTION[key] = benefit.Description;
      }
    }
  }
  return new_plans;
}

function populatePlanTable() {
  // Clear table
  plans_table_ele.innerHTML = "";

  // Table Heading
  let thead = document.createElement("thead");
  let theadRow = document.createElement("tr");
  theadRow.appendChild(document.createElement("td"));
  for (let i = 0; i < new_plans_name.length; i++) {
    let td = document.createElement("td");
    td.innerHTML = new_plans_name[i];
    theadRow.appendChild(td);
  }
  thead.appendChild(theadRow);
  plans_table_ele.appendChild(thead);

  // Table Body
  let tbody = document.createElement("tbody");

  for (let key in PLAN_FORMATTED) {
    let tr = document.createElement("tr");
    let plan = PLAN_FORMATTED[key];
    let td1 = document.createElement("td");
    let td1Span = document.createElement("span");
    let td1Tooltip = document.createElement("span");
    td1Tooltip.classList.add("tooltip");
    let td1TooltipText = document.createElement("span");
    td1TooltipText.classList.add("tooltiptext");

    td1Span.innerHTML = key + " ";
    if (PLAN_DESCRIPTION[key]) {
      td1Tooltip.innerHTML = "&nbsp; ℹ  &nbsp;";
      td1TooltipText.innerHTML = PLAN_DESCRIPTION[key];

      td1Tooltip.appendChild(td1TooltipText);
      td1.appendChild(td1Span);
      td1.appendChild(td1Tooltip);
    } else {
      td1.appendChild(td1Span);
    }

    tr.appendChild(td1);

    // read data form newArray
    if (key == "MonthlyPremium") {
      for (let x of newArray) {
        let value = x[1];
        let td = document.createElement("td");
        td.innerHTML = value;
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
      continue;
    } else if (key == "Deuctible (Health Benefit)") {
      for (let x of newArray) {
        let value = x[2];
        let td = document.createElement("td");
        td.innerHTML = value;
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
      continue;
    }

    for (let j = 0; j < plan.length; j++) {
      let td = document.createElement("td");
      td.innerHTML = plan[j].value;
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  plans_table_ele.appendChild(tbody);
}

document.addEventListener("DOMContentLoaded", () => {
  PLAN_JSON = [];
  PLAN_FORMATTED = {};
  PLAN_DESCRIPTION = {};
  selected_plans = ["Forever HMO", "Forevermore HMO", "Freedom PPO"];
  selected_plans = selected_plans.sort((a, b) => {
    let x = a.toLowerCase();
    let y = b.toLowerCase();
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  });

  new_plans_name = [];

  // new Array for read
  newArray = [
    ["Forevermore HMO", "$150", "$75"],
    ["Forevermore HMO", "$220", "$65"],
    ["Forevermore HMO", "$330", "$120"],
  ];
  plans_table_ele = document.getElementById("plans_table");
  getJson();
});
