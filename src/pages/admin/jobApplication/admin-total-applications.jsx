import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { getJobApplicationsByCompanyId } from "@/lib/services/api/jobApplication";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "@/components/shared/Loading";
import { format, parseISO, startOfWeek, subWeeks, subDays, isSameWeek } from "date-fns";
import {Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"



// Function to process the chart data for daily or weekly
function processChartData(applications, isDaily) {
  const groupedData = {};
  const today = new Date();

  if (isDaily) {
    // Daily processing: Last 7 days including today
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = subDays(today, 6-i);
      return format(date, "dd-MM-yyyy"); // format the date to string for grouping
    });

    last7Days.forEach((date) => {
      groupedData[date] = { date, good: 0, moderate: 0, bad: 0 }; // Initialize the structure for each day
    });

    applications.forEach((app) => {
      const date = format(parseISO(app.createdAt), "dd-MM-yyyy");
      if (last7Days.includes(date)) {
        // Increment the respective rating
        if (app.rating?.toLocaleLowerCase() === "good") {
          groupedData[date].good += 1;
        } else if (app.rating?.toLocaleLowerCase() === "moderate") {
          groupedData[date].moderate += 1;
        } else if (app.rating?.toLocaleLowerCase() === "bad") {
          groupedData[date].bad += 1;
        }
      }
    });
  } else {
    // Weekly processing: Last 4 weeks with Monday as start of the week
    const currentWeekStart = startOfWeek(today, { weekStartsOn: 1 }); // Set start of the week to Monday
    const last4Weeks = Array.from({ length: 4 }, (_, i) => {
      const start = subWeeks(currentWeekStart, 3-i);
      return { start, end: subDays(start, -6) }; // end is 6 days after start
    });

    last4Weeks.forEach((week) => {
      const weekKey = format(week.start, "dd-MM-yyyy") + " to " + format(week.end, "dd-MM-yyyy");
      groupedData[weekKey] = { week: weekKey, good: 0, moderate: 0, bad: 0 }; // Initialize the structure for each week
    });

    applications.forEach((app) => {
      const appDate = parseISO(app.createdAt);
      last4Weeks.forEach((week) => {
        if (isSameWeek(appDate, week.start, { weekStartsOn: 1 })) {
          // Increment the respective rating for the matching week
          const weekKey = format(week.start, "dd-MM-yyyy") + " to " + format(week.end, "dd-MM-yyyy");
          if (app.rating?.toLocaleLowerCase() === "good") {
            groupedData[weekKey].good += 1;
          } else if (app.rating?.toLocaleLowerCase() === "moderate") {
            groupedData[weekKey].moderate += 1;
          } else if (app.rating?.toLocaleLowerCase() === "bad") {
            groupedData[weekKey].bad += 1;
          }
        }
      });
    });
  }

  // Convert the grouped data to an array
  return Object.values(groupedData);
}

function DailyChart() {
  const params = useParams();
  const [jobApplications, setJobApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const [isDaily, setIsDaily] = useState(true); // State to track daily or weekly view

  const chartConfig = {
    good: {
      label: "Good",
      color: "#28a745",
    },
    moderate: {
      label: "Moderate",
      color: "#ffc107",
    },
    bad: {
      label: "Bad",
      color: "#dc3545",
    },
  };

  useEffect(() => {
    getJobApplicationsByCompanyId(params.companyId)
      .then((data) => {
        const processedData = processChartData(data, isDaily); // Process the chart data based on view
        setJobApplications(processedData);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setLoading(false);
      });
  }, [params.companyId, isDaily]); // Add isDaily to dependencies

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center">
        <p>Error While Fetching the Data</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-16 gap-y-8 h-screen">
      <h2>Job Applications Recieved</h2>
      <div className="container">
        <Tabs defaultValue="daily" className="w-[75%] mx-auto">
          <TabsList className="grid w-full grid-cols-2 bg-primary">
            <TabsTrigger value="daily" onClick={() => setIsDaily(true)}>Daily</TabsTrigger>
            <TabsTrigger value="weekly" onClick={() => setIsDaily(false)}>Weekly</TabsTrigger>
          </TabsList>
          <TabsContent value="daily">
            <ChartContainer config={chartConfig} className="min-h-[200px]">
              <BarChart accessibilityLayer data={jobApplications}>
              <CartesianGrid stroke="#e0e0e0" strokeDasharray="5 5" vertical={false} />
              <XAxis
                  dataKey="date"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="good" fill="var(--color-good)" radius={4} />
                <Bar dataKey="moderate" fill="var(--color-moderate)" radius={4} />
                <Bar dataKey="bad" fill="var(--color-bad)" radius={4} />
              </BarChart>
            </ChartContainer>
          </TabsContent>
          <TabsContent value="weekly">
            <ChartContainer config={chartConfig} className="min-h-[200px]">
              <BarChart accessibilityLayer data={jobApplications}>
              <CartesianGrid stroke="#e0e0e0" strokeDasharray="5 5" vertical={false} />
                <XAxis
                  dataKey="week"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="good" fill="var(--color-good)" radius={4} />
                <Bar dataKey="moderate" fill="var(--color-moderate)" radius={4} />
                <Bar dataKey="bad" fill="var(--color-bad)" radius={4} />
              </BarChart>
            </ChartContainer>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default DailyChart;
