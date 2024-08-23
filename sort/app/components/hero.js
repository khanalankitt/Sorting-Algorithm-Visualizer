"use client";
import React, { useEffect, useState } from "react";

function Hero() {
  const [selectedSort, setSelectedSort] = useState("");
  const [barHeight, setBarHeight] = useState([]);
  const [swappingIndices, setSwappingIndices] = useState([]);
  const [sorting, setSorting] = useState(false); 
  const sortingMethods = ["Bubble", "Selection", "Insertion", "Merge", "Quick"];
    useEffect(()=>{
        generate();
    },[]);
  const handleClick = async (sort) => {
    if (!sorting) {
      setSelectedSort(sort);
      await Sort(sort);
    }
  };

  const Sort = async (item) => {
    setSorting(true); 
    switch (item) {
      case "Bubble":
        await bubbleSort();
        break;
      case "Selection":
        await selectionSort();
        break;
      case "Insertion":
        await insertionSort();
        break;
      case "Merge":
        await mergeSortWrapper();
        break;
      case "Quick":
        await quickSortWrapper();
        break;
      default:
        return;
    }
    setSorting(false); 
  };

  const bubbleSort = async () => {
    let n = barHeight.length;
    let tempArr = [...barHeight];
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setSwappingIndices([j, j + 1]);
        if (tempArr[j] > tempArr[j + 1]) {
          [tempArr[j], tempArr[j + 1]] = [tempArr[j + 1], tempArr[j]];
          setBarHeight([...tempArr]);
        }
        await new Promise((resolve) => setTimeout(resolve, 30));
        setSwappingIndices([]);
      }
    }
  };

  const selectionSort = async () => {
    let n = barHeight.length;
    let tempArr = [...barHeight];
    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < n; j++) {
        setSwappingIndices([j, minIndex]);
        if (tempArr[j] < tempArr[minIndex]) {
          minIndex = j;
        }
        await new Promise((resolve) => setTimeout(resolve, 30));
      }
      [tempArr[i], tempArr[minIndex]] = [tempArr[minIndex], tempArr[i]];
      setBarHeight([...tempArr]);
      setSwappingIndices([]);
    }
  };

  const insertionSort = async () => {
    let n = barHeight.length;
    let tempArr = [...barHeight];
    for (let i = 1; i < n; i++) {
      let key = tempArr[i];
      let j = i - 1;
      while (j >= 0 && tempArr[j] > key) {
        setSwappingIndices([j, j + 1]);
        tempArr[j + 1] = tempArr[j];
        j--;
        setBarHeight([...tempArr]);
        await new Promise((resolve) => setTimeout(resolve, 30));
      }
      tempArr[j + 1] = key;
      setBarHeight([...tempArr]);
      setSwappingIndices([]);
    }
  };

  const mergeSortWrapper = async () => {
    let tempArr = [...barHeight];
    await mergeSort(tempArr, 0, tempArr.length - 1);
    setBarHeight([...tempArr]);
  };

  const mergeSort = async (arr, l, r) => {
    if (l >= r) return;
    const m = l + Math.floor((r - l) / 2);
    await mergeSort(arr, l, m);
    await mergeSort(arr, m + 1, r);
    await merge(arr, l, m, r);
  };

  const merge = async (arr, l, m, r) => {
    let n1 = m - l + 1;
    let n2 = r - m;
    let L = [],
      R = [];
    for (let i = 0; i < n1; i++) L.push(arr[l + i]);
    for (let i = 0; i < n2; i++) R.push(arr[m + 1 + i]);

    let i = 0,
      j = 0,
      k = l;
    while (i < n1 && j < n2) {
      setSwappingIndices([k]);
      if (L[i] <= R[j]) {
        arr[k] = L[i];
        i++;
      } else {
        arr[k] = R[j];
        j++;
      }
      setBarHeight([...arr]);
      await new Promise((resolve) => setTimeout(resolve, 30));
      k++;
    }
    while (i < n1) {
      setSwappingIndices([k]);
      arr[k] = L[i];
      i++;
      k++;
      setBarHeight([...arr]);
      await new Promise((resolve) => setTimeout(resolve, 30));
    }
    while (j < n2) {
      setSwappingIndices([k]);
      arr[k] = R[j];
      j++;
      k++;
      setBarHeight([...arr]);
      await new Promise((resolve) => setTimeout(resolve, 30));
    }
    setSwappingIndices([]);
  };

  const quickSortWrapper = async () => {
    let tempArr = [...barHeight];
    await quickSort(tempArr, 0, tempArr.length - 1);
    setBarHeight([...tempArr]);
  };

  const quickSort = async (arr, low, high) => {
    if (low < high) {
      let pi = await partition(arr, low, high);
      await quickSort(arr, low, pi - 1);
      await quickSort(arr, pi + 1, high);
    }
  };

  const partition = async (arr, low, high) => {
    let pivot = arr[high];
    let i = low - 1;
    for (let j = low; j <= high - 1; j++) {
      setSwappingIndices([j, high]);
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setBarHeight([...arr]);
        await new Promise((resolve) => setTimeout(resolve, 30));
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setBarHeight([...arr]);
    setSwappingIndices([]);
    return i + 1;
  };

  const generate = () => {
    if (!sorting) {
      let tempArr = [];
      for (let i = 0; i < 30; i++) {
        tempArr[i] = Math.floor(Math.random() * 90) + 10;
      }
      setBarHeight(tempArr);
    }
  };

  return (
    <div className="h-[600px] md:h-4/5 w-[95%] md:w-4/5 flex flex-col md:flex-row items-center justify-between border-2 rounded-xl border-gray-400">
      <aside className="h-[65%] md:h-full w-full md:w-[20%] self-start md:p-3 flex items-center justify-start md:justify-center flex-col">
        <ul>
          {sortingMethods.map((item, index) => (
            <li
              key={index}
              className={`text-base md:text-lg p-2 md:mt-1 hover:bg-gray-200 rounded-lg text-left ${
                selectedSort === item ? "bg-gray-200" : ""
              } cursor-pointer ${sorting ? "cursor-not-allowed opacity-50" : ""}`}
              onClick={() => handleClick(item)}
            >
              {item} Sort
            </li>
          ))}
        </ul>
        <br />
        <button
          className={`h-7 flex items-center justify-center -mt-4 md:mt-0 md:h-10 w-auto p-1 px-3 bg-blue-500 text-white rounded-lg outline-none border-none text-base md:text-lg ${
            sorting ? "cursor-not-allowed opacity-50" : ""
          }`}
          onClick={generate}
          disabled={sorting}
        >
          Generate Random 
        </button>
      </aside>
      <section className="w-full md:w-[90%] h-full flex items-center justify-start flex-col gap-3 p-1 md:p-3">
        <p className="text-lg font-semibold">{selectedSort} Sort</p>
        <div className="h-full md:h-[90%] w-full md:w-[90%] bg-gray-200 rounded-xl flex items-end justify-center gap-1">
          {barHeight.map((item, index) => (
            <div
              key={index}
              style={{
                height: `${item}%`,
                backgroundColor: swappingIndices.includes(index)
                  ? "blue"
                  : "orange",
              }}
              className="w-[6px] md:w-5 flex items-end justify-end"
            >
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Hero;
