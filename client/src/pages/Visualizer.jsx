import { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout";

function Visualizer() {

  const [array, setArray] = useState([]);
  const [activeIndices, setActiveIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);

  const [arraySize, setArraySize] = useState(30);
  const [speed, setSpeed] = useState(50);

  const [isSorting, setIsSorting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const stopSortingRef = useRef(false);
  const pauseRef = useRef(false);

  const [algorithmInfo, setAlgorithmInfo] = useState({
    name: "",
    time: "",
    space: "",
    description: ""
  });

  function generateArray() {

    stopSortingRef.current = true;
    pauseRef.current = false;

    setIsSorting(false);
    setIsPaused(false);

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
  }, [arraySize]);

  const delay = () =>
    new Promise((resolve) => setTimeout(resolve, 210 - speed));

  async function pauseCheck() {
    while (pauseRef.current) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  /* ---------------- Bubble Sort ---------------- */

  async function bubbleSort() {

    setAlgorithmInfo({
      name: "Bubble Sort",
      time: "O(n²)",
      space: "O(1)",
      description:
        "Bubble Sort repeatedly compares adjacent elements and swaps them if they are in the wrong order."
    });

    if (isSorting) return;

    stopSortingRef.current = false;
    setIsSorting(true);

    const arr = [...array];

    for (let i = 0; i < arr.length; i++) {

      for (let j = 0; j < arr.length - i - 1; j++) {

        if (stopSortingRef.current) {
          setIsSorting(false);
          return;
        }

        await pauseCheck();

        setActiveIndices([j, j + 1]);

        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
        }

        await delay();
      }

      setSortedIndices((prev) => [...prev, arr.length - i - 1]);
    }

    setActiveIndices([]);
    setIsSorting(false);
  }

  /* ---------------- Selection Sort ---------------- */

  async function selectionSort() {

    setAlgorithmInfo({
      name: "Selection Sort",
      time: "O(n²)",
      space: "O(1)",
      description:
        "Selection Sort repeatedly selects the minimum element and places it at the beginning."
    });

    if (isSorting) return;

    stopSortingRef.current = false;
    setIsSorting(true);

    const arr = [...array];

    for (let i = 0; i < arr.length; i++) {

      let minIndex = i;

      for (let j = i + 1; j < arr.length; j++) {

        if (stopSortingRef.current) {
          setIsSorting(false);
          return;
        }

        await pauseCheck();

        setActiveIndices([minIndex, j]);

        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }

        await delay();
      }

      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      setArray([...arr]);

      setSortedIndices((prev) => [...prev, i]);
    }

    setActiveIndices([]);
    setIsSorting(false);
  }

  /* ---------------- Insertion Sort ---------------- */

  async function insertionSort() {

    setAlgorithmInfo({
      name: "Insertion Sort",
      time: "O(n²)",
      space: "O(1)",
      description:
        "Insertion Sort builds the sorted array by inserting elements into their correct position."
    });

    if (isSorting) return;

    stopSortingRef.current = false;
    setIsSorting(true);

    const arr = [...array];

    for (let i = 1; i < arr.length; i++) {

      let key = arr[i];
      let j = i - 1;

      while (j >= 0 && arr[j] > key) {

        if (stopSortingRef.current) {
          setIsSorting(false);
          return;
        }

        await pauseCheck();

        setActiveIndices([j, j + 1]);

        arr[j + 1] = arr[j];
        setArray([...arr]);

        j--;
        await delay();
      }

      arr[j + 1] = key;
      setArray([...arr]);
    }

    setSortedIndices(arr.map((_, i) => i));
    setActiveIndices([]);
    setIsSorting(false);
  }

  /* ---------------- Merge Sort ---------------- */

  async function mergeSort() {

    setAlgorithmInfo({
      name: "Merge Sort",
      time: "O(n log n)",
      space: "O(n)",
      description:
        "Merge Sort divides the array and merges sorted halves using divide and conquer."
    });

    if (isSorting) return;

    stopSortingRef.current = false;
    setIsSorting(true);

    const arr = [...array];
    await mergeSortHelper(arr, 0, arr.length - 1);

    setArray([...arr]);
    setSortedIndices(arr.map((_, i) => i));
    setActiveIndices([]);
    setIsSorting(false);
  }

  async function mergeSortHelper(arr, left, right) {

    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);

    await mergeSortHelper(arr, left, mid);
    await mergeSortHelper(arr, mid + 1, right);

    await merge(arr, left, mid, right);
  }

  async function merge(arr, left, mid, right) {

    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);

    let i = 0;
    let j = 0;
    let k = left;

    while (i < leftArr.length && j < rightArr.length) {

      if (stopSortingRef.current) return;

      await pauseCheck();

      setActiveIndices([k]);

      if (leftArr[i] <= rightArr[j]) {
        arr[k++] = leftArr[i++];
      } else {
        arr[k++] = rightArr[j++];
      }

      setArray([...arr]);
      await delay();
    }

    while (i < leftArr.length) {
      arr[k++] = leftArr[i++];
      setArray([...arr]);
      await delay();
    }

    while (j < rightArr.length) {
      arr[k++] = rightArr[j++];
      setArray([...arr]);
      await delay();
    }
  }

  /* ---------------- Quick Sort ---------------- */

  async function quickSort() {

    setAlgorithmInfo({
      name: "Quick Sort",
      time: "O(n log n)",
      space: "O(log n)",
      description:
        "Quick Sort selects a pivot and partitions the array around it."
    });

    if (isSorting) return;

    stopSortingRef.current = false;
    setIsSorting(true);

    const arr = [...array];
    await quickSortHelper(arr, 0, arr.length - 1);

    setArray([...arr]);
    setSortedIndices(arr.map((_, i) => i));
    setActiveIndices([]);
    setIsSorting(false);
  }

  async function quickSortHelper(arr, low, high) {

    if (low < high) {

      const pivotIndex = await partition(arr, low, high);

      await quickSortHelper(arr, low, pivotIndex - 1);
      await quickSortHelper(arr, pivotIndex + 1, high);
    }
  }

  async function partition(arr, low, high) {

    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {

      if (stopSortingRef.current) return;

      await pauseCheck();

      setActiveIndices([j, high]);

      if (arr[j] < pivot) {

        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];

        setArray([...arr]);
        await delay();
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);
    await delay();

    return i + 1;
  }

  return (

    <Layout>

      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
        Algorithm Visualizer
      </h1>

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-8 flex flex-wrap gap-4 items-center">

        <button onClick={generateArray} className="px-4 py-2 rounded bg-slate-700 hover:bg-slate-600">
          Generate
        </button>

        <button onClick={bubbleSort} disabled={isSorting} className="px-4 py-2 rounded bg-blue-600">
          Bubble
        </button>

        <button onClick={selectionSort} disabled={isSorting} className="px-4 py-2 rounded bg-purple-600">
          Selection
        </button>

        <button onClick={insertionSort} disabled={isSorting} className="px-4 py-2 rounded bg-green-600">
          Insertion
        </button>

        <button onClick={mergeSort} disabled={isSorting} className="px-4 py-2 rounded bg-pink-600">
          Merge
        </button>

        <button onClick={quickSort} disabled={isSorting} className="px-4 py-2 rounded bg-yellow-500 text-black">
          Quick
        </button>

        <button
          onClick={() => {
            setIsPaused(!isPaused);
            pauseRef.current = !pauseRef.current;
          }}
          className="px-4 py-2 rounded bg-orange-500"
        >
          {isPaused ? "Resume" : "Pause"}
        </button>

        <button onClick={generateArray} className="px-4 py-2 rounded bg-red-600">
          Reset
        </button>

        <div className="flex items-center gap-2 ml-4">
          Size
          <input
            type="range"
            min="10"
            max="100"
            value={arraySize}
            onChange={(e) => setArraySize(Number(e.target.value))}
          />
        </div>

        <div className="flex items-center gap-2">
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

      {algorithmInfo.name && (

        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-8 max-w-md">

          <h3 className="text-xl font-semibold mb-2">
            {algorithmInfo.name}
          </h3>

          <p>Time Complexity: {algorithmInfo.time}</p>
          <p>Space Complexity: {algorithmInfo.space}</p>

          <p className="mt-2 text-gray-300">
            {algorithmInfo.description}
          </p>

        </div>

      )}

      <div className="h-[400px] flex items-end justify-center gap-[3px]">

        {array.map((value, index) => (
          <div
            key={index}
            style={{
              height: `${value}px`,
              width: `${Math.max(5, 800 / array.length)}px`,
              backgroundColor: sortedIndices.includes(index)
                ? "green"
                : activeIndices.includes(index)
                ? "red"
                : "#3b82f6",
              transition: "height 0.25s ease"
            }}
          ></div>
        ))}

      </div>

    </Layout>
  );
}

export default Visualizer;