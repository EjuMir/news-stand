import Chart from "react-google-charts";
import useAllPublishers from "../../../Hooks/useAllPublishers";
import useAllNews from "../../../Hooks/useAllNews";

const DashHome = () => {

    const [publishers] = useAllPublishers();
    const [allArticles] = useAllNews();

    const publisher = publishers.map(publisher => publisher.name)

    const pieChart = [["Post", "Articles Posted"]];
    for (let i = 0; i < publisher.length; i++) {
        pieChart.push([publisher[i], (allArticles.filter(article => article.publisher == publisher[i]).length)])
    }
    console.log(pieChart);

    const optionsPie = {
        title: "Publishers Posting Article Ratio",
    };

    const optionBar = {
        title: "All Articles Posted By Publisher",
        chartArea: { width: "50%" },
        hAxis: {
            title: "Article",
            minValue: 0,
        },
        vAxis: {
            title: "Publishers",
        },
    };

    const optionArea = {
        title: "Article Publications",
        hAxis: { title: "Publishers", titleTextStyle: { color: "#333" } },
        vAxis: { minValue: 0 },
        chartArea: { width: "50%", height: "70%" },
      };

    return (
        <div>
            <div className="my-7">
                {
                    <Chart
                        chartType="PieChart"
                        data={pieChart}
                        width={"100%"}
                        height={"400px"}
                        options={optionsPie}
                        legendToggle
                    >

                    </Chart>
                }
            </div>
            <div className="my-7">
                <Chart
                    chartType="BarChart"
                    width="100%"
                    height="400px"
                    data={pieChart}
                    options={optionBar}

                />
            </div>

            <div className="my-7">
                <Chart
                    chartType="AreaChart"
                    width="100%"
                    height="400px"
                    data={pieChart}
                    options={optionArea}
                />
            </div>

        </div>
    );
};

export default DashHome;