import { useState, useEffect } from "react";

function Visualizer() {

  const [array, setArray] = useState([]);
  const [activeIndices, setActiveIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [arraySize, setArraySize] = useState(30);
  const [speed, setSpeed] = useState(50);

  function generateArray() {
    const newArray = [];

    setSortedIndices([]);
    setActiveIndices([]);

    for (let i = 0; i < arraySize; i++) {
      newArray.push(Math.floor(Math.random() * 300) + 20);
    }

    setArray(newArray);
  }

  useEffect(() => {
    generateArray();
  }, []);

  async function bubbleSort() {
    const arr = [...array];

    for (let i = 0; i < arr.length; i++) {

      for (let j = 0; j < arr.length - i - 1; j++) {

        setActiveIndices([j, j + 1]);

        if (arr[j] > arr[j + 1]) {

          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;

          setArray([...arr]);

        }

        await new Promise((resolve) => setTimeout(resolve, 210 - speed));

      }

      setSortedIndices((prev) => [...prev, arr.length - i - 1]);

    }

    setActiveIndices([]);
  }

  async function selectionSort() {

    const arr = [...array];
  
    for (let i = 0; i < arr.length; i++) {
  
      let minIndex = i;
  
      for (let j = i + 1; j < arr.length; j++) {
  
        setActiveIndices([minIndex, j]);
  
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
  
        await new Promise((resolve) => setTimeout(resolve, 210 - speed));
      }
  
      if (minIndex !== i) {
  
        let temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
  
        setArray([...arr]);
      }
  
      setSortedIndices((prev) => [...prev, i]);
  
    }
  
    setActiveIndices([]);
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Algorithm Visualizer</h1>

      <div style={{ display: "flex", gap: "20px", margin: "20px 0", alignItems: "center" }}>
        <button onClick={generateArray}>Generate Array</button>
        <button onClick={bubbleSort}>Bubble Sort</button>
        <button onClick={selectionSort}>Selection Sort</button>
        <button>Insertion Sort</button>

        <div>
          Size
          <input
            type="range"
            min="10"
            max="100"
            value={arraySize}
            onChange={(e) => setArraySize(Number(e.target.value))}
          />
        </div>

        <div>
          Speed
          <input
            type="range"
            min="10"
            max="200"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          />
        </div>
      </div>

      <div
        style={{
          height: "400px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: "5px",
        }}
      >
        {array.map((value, index) => (
          <div
            key={index}
            style={{
              height: `${value}px`,
              width: "10px",
              backgroundColor: sortedIndices.includes(index)
                ? "green"
                : activeIndices.includes(index)
                ? "red"
                : "#2563eb",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Visualizer;