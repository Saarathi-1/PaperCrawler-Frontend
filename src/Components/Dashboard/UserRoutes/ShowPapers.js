import React, { useState, useEffect } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";
import { useFetch } from "../../Hooks/useFetch"; // Assuming useFetch is in the same directory
import { Chart as ChartJS, Tooltip, ArcElement, Title, Legend, CategoryScale } from 'chart.js';

ChartJS.register({
  Tooltip, Title, ArcElement, Legend,CategoryScale
})

function ShowPapers() {
  const navigate = useNavigate();
  
  // Fetch data from the API
  const { data, isLoading, error } = useFetch(
    "http://localhost:5000/api/proposal/submitted-by-user",
    "GET"
  );

  // Define initial state for the chart data
  const [chartData, setChartData] = useState({
    labels: ['Funded', 'Rejected', 'Submitted', 'Drafts'],
    datasets: [{
      label: 'My First Dataset',
      data: [0, 0, 0, 0], // Initialize with zeros
      backgroundColor: [
        'rgb(50,205,50)',
        'rgb(255,0,0)',
        'rgb(255, 197, 92)',
        'rgb(0, 162, 237)',
      ],
      hoverOffset: 4
    }]
  });

  // Update chart data when data from API changes
  useEffect(() => {
    if (data && data.success) {
      const { counts } = data;
      const newData = [...chartData.datasets[0].data];
      newData[0] = counts.funded;
      newData[1] = counts.verified - counts.funded; // Assuming rejected is the opposite of funded
      newData[2] = counts.submitted;
      newData[3] = counts.drafts;
      setChartData(prevState => ({
        ...prevState,
        datasets: [{
          ...prevState.datasets[0],
          data: newData
        }]
      }));
    }
  }, [data]);

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Statistics',
        color: 'white',
        font: {
          size: 20 // Reduce font size
        },
        padding: {
          top: 30,
          bottom: 30
        },
        responsive: true,
        animation: {
          animateScale: true,
        }
      },
      legend: {
        display: true,
        position: 'bottom', // Show legend at the bottom
        labels: {
          color: 'white',
          font: {
            size: 12 // Reduce legend font size
          }
        }
      }
    }
  };

  return (
    <Flex align="center">
      <Flex
        direction="column"
        w="50vw"
        h="75vh"
        gap={8}
        align="center"
        justify="center"
      >
        <Button
          w="30vw"
          h="10vh"
          onClick={() => {
            navigate("drafts");
          }}
        >
          Go to Drafts
        </Button>
        <Button leftIcon={<VisibilityIcon />} onClick={() => {
          navigate("/dashboard/submitted");
        }} w="30vw" h="10vh">View Submitted Proposals</Button>
        <Button leftIcon={<VisibilityIcon />} onClick={() => {
          navigate("/dashboard/funded");
        }} w="30vw" h="10vh">View Funded Proposals</Button>
      </Flex>
      <Flex w="35%" align="center" justify="center">
        <Doughnut data={chartData} options={options} height={150} />
      </Flex>
    </Flex>
  );
}
export default ShowPapers;
