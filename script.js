/* global d3 */

// Our canvas
const width = 750,
  height = 300,
  margin = 20,
  marginLeft = 40

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .style('background', '#cacaca')

// Data reloading
let reload = () => {
  // Your data parsing here...
  d3.tsv("afcw-results.tsv", function(data) {
    let goals = data.map(x => x.GoalsScored)
    redraw(goals)
  })
}

// redraw function
let redraw = (data) => {
  // Your data to graph here
  let xLength = width / data.length

  let yScale = d3.scaleLinear()
  .domain([0, d3.max(data)])
  .range([0, height - margin])

  let yAxis = d3.scaleLinear()
  .domain([0, d3.max(data)])
  .range([height - margin, 0])

  let xAxis = d3.scaleLinear()
  .domain([0, data.length])
  .range([0, width])

  let colorScale = d3.scaleLinear()
  .domain([0, d3.max(data)])
  .range(['peru', 'teal'])

  svg.selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr('class', 'bar')
  .attr('x', (d, i) => {
    return i * xLength + marginLeft -10
  })
  .attr('y', (d) => {
    return height - yScale(d) - margin
  })
  .attr('width', xLength - 2)
  .attr('height', (d) => {
    return yScale(d)
  })
  .attr('fill', colorScale)

  svg.append('g')
  .attr('class', 'axisSteelBlue')
  .attr('transform', `translate(${marginLeft - 10})`)
  .call(d3.axisLeft(yAxis).ticks(d3.max(data)))

  svg.append('g')
  .attr('class', 'axisSteelBlue')
  .attr('transform', `translate(${marginLeft - 10}, ${height - margin})`)
  .call(d3.axisBottom(xAxis).ticks(data.length))
}

reload()
