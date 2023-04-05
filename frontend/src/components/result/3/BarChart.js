import React, { useEffect, useRef } from "react";

import { Box } from "@chakra-ui/react";
import * as d3 from "d3";

const BarChart = ({ data, chartContainer }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = drawBarChart();
      chartRef.current.appendChild(chart);
    }
  }, []);

  const drawBarChart = () => {
    // 2) 데이터 정의
    // const data = Array(26)
    //   .fill(0)
    //   .map((_, i) => ({
    //     letter: String.fromCharCode(65 + i),
    //     frequency: [
    //       0.08167, 0.01492, 0.02782, 0.04253, 0.12702, 0.02288, 0.02015,
    //       0.06094, 0.06966, 0.00153, 0.00772, 0.04025, 0.02406, 0.06749,
    //       0.07507, 0.01929, 0.00095, 0.05987, 0.06327, 0.09056, 0.02758,
    //       0.00978, 0.0236, 0.0015, 0.01974, 0.00074,
    //     ][i],
    //   }));

    // 1) 차트 정의
    const chart = BarChart(data, {
      x: (d) => d.letter,
      y: (d) => d.frequency,
      xDomain: d3.groupSort(
        data,
        ([d]) => -d.frequency,
        (d) => d.letter
      ),
      yFormat: "",
      yLabel: "↑ Frequency",
      width: chartContainer.current.offsetWidth,
      height: 500,
      color: d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, 10)),
      // color: "steelblue",
    });

    return chart;
  };
  function BarChart(
    data,
    {
      x = (d, i) => i, // given d in data, returns the (ordinal) x-value
      y = (d) => d, // given d in data, returns the (quantitative) y-value
      title, // given d in data, returns the title text
      marginTop = 20, // the top margin, in pixels
      marginRight = 0, // the right margin, in pixels
      marginBottom = 30, // the bottom margin, in pixels
      marginLeft = 40, // the left margin, in pixels
      width = 640, // the outer width of the chart, in pixels
      height = 400, // the outer height of the chart, in pixels
      xDomain, // an array of (ordinal) x-values
      xRange = [marginLeft, width - marginRight], // [left, right]
      yType = d3.scaleLinear, // y-scale type
      yDomain, // [ymin, ymax]
      yRange = [height - marginBottom, marginTop], // [bottom, top]
      xPadding = 0.1, // amount of x-range to reserve to separate bars
      yFormat, // a format specifier string for the y-axis
      yLabel, // a label for the y-axis
      color = "currentColor", // bar fill color
      // color = "currentColor", // bar fill color
    } = {}
  ) {
    // Compute values.
    const X = d3.map(data, x);
    const Y = d3.map(data, y);

    // Compute default domains, and unique the x-domain.
    if (xDomain === undefined) xDomain = X;
    // if (yDomain === undefined) yDomain = [0, d3.max(Y)];
    if (yDomain === undefined) yDomain = [0, d3.max(Y)];
    xDomain = new d3.InternSet(xDomain);

    // Omit any data not present in the x-domain.
    const I = d3.range(X.length).filter((i) => xDomain.has(X[i]));

    // Construct scales, axes, and formats.
    const xScale = d3.scaleBand(xDomain, xRange).padding(xPadding);
    const yScale = yType(yDomain, yRange);
    const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);
    const yAxis = d3.axisLeft(yScale).ticks(height / 40, yFormat);

    // Compute titles.
    if (title === undefined) {
      const formatValue = yScale.tickFormat(100, yFormat);
      title = (i) => `${X[i]}\n${formatValue(Y[i])}`;
    } else {
      const O = d3.map(data, (d) => d);
      const T = title;
      title = (i) => T(O[i], i, data);
    }

    const svg = d3
      .create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])

      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(yAxis)
      .call((g) => g.select(".domain").remove())

      .call((g) =>
        g
          .selectAll(".tick line")
          .clone()
          .attr("x2", width - marginLeft - marginRight)
          .attr("stroke-opacity", 0.1)
      )
      .call((g) =>
        g
          .append("text")
          .attr("x", -marginLeft)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text(yLabel)
      );

    const bar = svg
      .append("g")
      .attr("fill", color)
      .selectAll("rect")
      .data(I)
      .join("rect")
      .attr("x", (i) => xScale(X[i]))
      .attr("y", (i) => yScale(Y[i]))
      .attr("height", (i) => yScale(0) - yScale(Y[i]))
      .attr("width", xScale.bandwidth());

    if (title) bar.append("title").text(title);

    svg
      .append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(xAxis);

    return svg.node();
  }
  // 3) BarChart 함수
  // 여기에 이전에 주어진 BarChart 함수 코드를 붙여 넣으세요.
  function BarChart(
    data,
    {
      x = (d, i) => i, // given d in data, returns the (ordinal) x-value
      y = (d) => d, // given d in data, returns the (quantitative) y-value
      title, // given d in data, returns the title text
      marginTop = 20, // the top margin, in pixels
      marginRight = 0, // the right margin, in pixels
      marginBottom = 30, // the bottom margin, in pixels
      marginLeft = 40, // the left margin, in pixels
      width = 640, // the outer width of the chart, in pixels
      height = 400, // the outer height of the chart, in pixels
      xDomain, // an array of (ordinal) x-values
      xRange = [marginLeft, width - marginRight], // [left, right]
      yType = d3.scaleLinear, // y-scale type
      yDomain, // [ymin, ymax]
      yRange = [height - marginBottom, marginTop], // [bottom, top]
      xPadding = 0.1, // amount of x-range to reserve to separate bars
      yFormat, // a format specifier string for the y-axis
      yLabel, // a label for the y-axis
      color = "currentColor", // bar fill color
    } = {}
  ) {
    // Compute values.
    const X = d3.map(data, x);
    const Y = d3.map(data, y);

    // Compute default domains, and unique the x-domain.
    if (xDomain === undefined) xDomain = X;
    // y도메인 결정하기
    if (yDomain === undefined) yDomain = [0, d3.max(Y)];
    // if (yDomain === undefined) yDomain = [0, 1];
    xDomain = new d3.InternSet(xDomain);

    // Omit any data not present in the x-domain.
    const I = d3.range(X.length).filter((i) => xDomain.has(X[i]));

    // Construct scales, axes, and formats.
    const xScale = d3.scaleBand(xDomain, xRange).padding(xPadding);
    const yScale = yType(yDomain, yRange);
    const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);
    const yAxis = d3.axisLeft(yScale).ticks(height / 40, yFormat);

    // Compute titles.
    if (title === undefined) {
      const formatValue = yScale.tickFormat(100, yFormat);
      title = (i) => `${X[i]}\n${formatValue(Y[i])}`;
    } else {
      const O = d3.map(data, (d) => d);
      const T = title;
      title = (i) => T(O[i], i, data);
    }

    const svg = d3
      .create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
    svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(yAxis)
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .selectAll(".tick line")
          .clone()
          .attr("x2", width - marginLeft - marginRight)
          .attr("stroke-opacity", 0.1)
      )
      .call((g) =>
        g
          .append("text")
          .attr("x", -marginLeft)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text(yLabel)
      );

    const bar = svg
      .append("g")
      .attr("fill", color)
      .selectAll("rect")
      .data(I)
      .join("rect")
      .attr("x", (i) => xScale(X[i]))
      .attr("y", (i) => yScale(Y[i]))
      .attr("height", (i) => yScale(0) - yScale(Y[i]))
      .attr("width", xScale.bandwidth());
    if (title) bar.append("title").text(title);

    svg
      .append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(xAxis);

    return svg.node();
  }

  return <Box ref={chartRef}></Box>;
};

export default BarChart;
