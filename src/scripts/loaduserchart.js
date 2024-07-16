import * as d3 from "d3";

// making it zoom

const width = 928;
const height = 500;
const marginTop = 20;
const marginRight = 0;
const marginBottom = 30;
const marginLeft = 40;

data = FileAttachment("off_device_hours.csv").csv({typed: true})

// horizontal scale and axis generator
const x = d3.scaleBand()
.domain(d3.sort(data, d => -d.frequency).map(d => d.letter))
.range([marginLeft, width - marginRight])
.padding(0.1);

const xAxis = d3.axisBottom(x).tickSizeOuter(0);

// vertical scale 
const y = d3.scaleLinear() 
.domain([0, d3.max(data, d => d.frequency)]).nice() // also rounds to nice values
.range([height - marginBottom, marginTop]);

  // make SVG container, call zoom 
const svg = d3.create("svg")
    .attr("viewBox", [0, 0, width, height])
    .attr("width", width)
    .attr("height", height)
    .attr("style", "max-width: 100%; height: auto;")
    .call(zoom);


  // Append the bars.
svg.append("g")
    .attr("class", "bars")
    .attr("fill", "steelblue")
.selectAll("rect")
.data(data)
.join("rect")
    .attr("x", d => x(d.letter))
    .attr("y", d => y(d.frequency))
    .attr("height", d => y(0) - y(d.frequency))
    .attr("width", x.bandwidth());

  // Append the axes.
svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(xAxis);
