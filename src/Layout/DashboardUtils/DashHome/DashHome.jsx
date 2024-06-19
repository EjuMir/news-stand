import Chart from "react-google-charts";

const DashHome = () => {
    return (
        <div>
            <Chart
           chartType="PieChart"
           data={[["Age", "Weight"], ["4", 5.5], ["8", 12]]}
           width="100%"
           height="400px"
           legendToggle
           >

            </Chart>
        </div>
    );
};

export default DashHome;