// import { UserApi } from "@/api/UserApi";
// import { apiUrl } from "@/lib/constants";
// import { formatIndianNumber } from "@/modules/dashboard/mfpa/mfpa-static-table";
// import Storage from "@/utils/storage";
// import React, { useEffect, useState } from "react";
// import { FaPencilAlt } from "react-icons/fa";
// import {
//   IoAddCircleOutline,
//   IoChevronDown,
//   IoChevronUp,
// } from "react-icons/io5";

// type Investment = {
//   id: number;
//   name: string;
//   invested: number;
//   current: number;
//   return?: string;
//   percentage: number;
//   subData?: Investment[];
// };

// const InvestmentTable: React.FC = () => {
//   const [investments, setInvestments] = useState<Investment[]>([]);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editingRows, setEditingRows] = useState<number[]>([]);
//   const [expandedRow, setExpandedRow] = useState<number | null>(null);
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [newInvestment, setNewInvestment] = useState<Investment>({
//     id: 0,
//     name: "",
//     invested: 0,
//     current: 0,
//     percentage: 0,
//   });
//   const [selectedAssetClass, setSelectedAssetClass] = useState<string>("");
//   const [editingSubRows, setEditingSubRows] = useState<{
//     [key: number]: number[];
//   }>({});
//   const [tablePostSuccess, setTablePostSuccess] = useState(false);

//   useEffect(() => {
//     const FetchMutualFunds = async () => {
//       try {
//         const { access_token } = Storage.getToken()!;
//         const userApiClient = new UserApi(access_token);
//         const res = await userApiClient.getInvestmentsUser();
//         if (res.ok) {
//           const responseData = await res.json();
//           const mutualFunds =
//             responseData.data[0].responseFromMFCentral.data[0].schemes;

//           const mutualFundSubData = mutualFunds.map(
//             (scheme: any, index: number) => ({
//               id: index + 1,
//               name: scheme.schemeName,
//               invested: parseFloat(scheme.costValue),
//               current: parseFloat(scheme.currentMktValue),
//               percentage: 0,
//             })
//           );

//           const updatedInvestments = investments.map((investment) => {
//             if (investment.name === "Mutual Funds") {
//               return {
//                 ...investment,
//                 subData: mutualFundSubData,
//               };
//             }
//             return investment;
//           });

//           setInvestments(updatedInvestments);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     FetchMutualFunds();
//   }, []);

//   useEffect(() => {
//     const fetchInvestmentData = async () => {
//       const { access_token } = Storage.getToken()!;
//       try {
//         const userApiClient = new UserApi(access_token);
//         const res = await userApiClient.getPortfolio();
//         if (res.ok) {
//           const data = await res.json();
//           setInvestments(data);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchInvestmentData();
//   }, []);

//   const removeReturnField = (investments: Investment[]): Investment[] => {
//     return investments.map(({ return: _return, subData, ...rest }) => ({
//       ...rest,
//       ...(subData ? { subData: removeReturnField(subData) } : {}),
//     }));
//   };

//   const postInvestmentData = async (data: Investment[]) => {
//     const url = `${apiUrl}/api/v1/portfolio/portfolio-create`;
//     const { access_token } = Storage.getToken()!;
//     const filteredData = removeReturnField(data);

//     try {
//       const response = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${access_token}`,
//         },
//         body: JSON.stringify({ portfolios: filteredData }),
//       });

//       if (response.ok) {
//         setTablePostSuccess((prev) => !prev);
//       } else {
//         console.error("HTTP Error:", response.status, response.statusText);
//         setTablePostSuccess((prev) => !prev);
//       }
//     } catch (error) {
//       setTablePostSuccess(false);
//       console.error("Fetch Error:", error);
//     }
//   };

//   const updateInvestmentData = async (
//     id: string,
//     data: Partial<Investment>
//   ) => {
//     const { access_token } = Storage.getToken()!;
//     const url = `${apiUrl}/api/v1/portfolio/portfolio-edit/${id}`;
//     try {
//       const response = await fetch(url, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${access_token}`,
//         },
//         body: JSON.stringify(data),
//       });

//       if (response.ok) {
//         console.log("Portfolio updated successfully");
//       } else {
//         console.error("HTTP Error:", response.status, response.statusText);
//       }
//     } catch (error) {
//       console.error("Fetch Error:", error);
//     }
//   };

//   const deleteInvestment = async (id: string) => {
//     const url = `${apiUrl}/api/v1/portfolio/portfolio-delete/${id}`;
//     const { access_token } = Storage.getToken()!;
//     try {
//       const response = await fetch(url, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${access_token}`,
//         },
//       });

//       if (response.ok) {
//         console.log("Portfolio deleted successfully");
//       } else {
//         console.error("HTTP Error:", response.status, response.statusText);
//       }
//     } catch (error) {
//       console.error("Fetch Error:", error);
//     }
//   };

//   const handleEditClick = () => {
//     if (isEditing) {
//       investments.forEach((inv) => {
//         if (editingRows.includes(inv.id)) {
//           updateInvestmentData(inv.id.toString(), {
//             name: inv.name,
//             invested: inv.invested,
//             current: inv.current,
//           });
//         }

//         inv.subData?.forEach((sub) => {
//           if (editingSubRows[inv.id]?.includes(sub.id)) {
//             updateInvestmentData(sub.id.toString(), {
//               name: sub.name,
//               invested: sub.invested,
//               current: sub.current,
//             });
//           }
//         });
//       });
//       setEditingRows([]);
//       setEditingSubRows({});
//     }
//     setIsEditing(!isEditing);
//   };

//   const handleSubRowEditClick = (parentId: number, subId: number) => {
//     setEditingSubRows((prevState) => ({
//       ...prevState,
//       [parentId]: prevState[parentId]?.includes(subId)
//         ? prevState[parentId].filter((id) => id !== subId)
//         : [...(prevState[parentId] || []), subId],
//     }));
//   };

//   const handleInputChange = (
//     id: number,
//     value: string | number,
//     field: "invested" | "name" | "current"
//   ) => {
//     setInvestments(
//       investments.map((inv) =>
//         inv.id === id
//           ? {
//               ...inv,
//               [field]:
//                 field === "invested" || field === "current"
//                   ? parseInt(value as string, 10)
//                   : value,
//             }
//           : inv
//       )
//     );
//     setEditingRows((prevState) => [...new Set([...prevState, id])]);
//   };

//   const handleSubRowInputChange = (
//     parentId: number,
//     subId: number,
//     value: string | number,
//     field: "invested" | "name" | "current"
//   ) => {
//     setInvestments(
//       investments.map((inv) => {
//         if (inv.id === parentId) {
//           return {
//             ...inv,
//             subData: inv.subData?.map((sub) =>
//               sub.id === subId
//                 ? {
//                     ...sub,
//                     [field]:
//                       field === "invested" || field === "current"
//                         ? parseInt(value as string, 10)
//                         : value,
//                   }
//                 : sub
//             ),
//           };
//         }
//         return inv;
//       })
//     );
//     setEditingSubRows((prevState) => ({
//       ...prevState,
//       [parentId]: [...new Set([...(prevState[parentId] || []), subId])],
//     }));
//   };

//   const handleAddRow = () => {
//     setShowAddForm((prev) => !prev);
//   };

//   const handleExpandClick = (id: number) => {
//     setExpandedRow(expandedRow === id ? null : id);
//   };

//   const handleFormChange = (
//     field: keyof Investment,
//     value: string | number
//   ) => {
//     setNewInvestment({ ...newInvestment, [field]: value });
//   };

//   const handleAssetClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedAssetClass(e.target.value);
//   };

//   const handleSubmitNewRow = () => {
//     const newId =
//       investments.length > 0
//         ? Math.max(...investments.map((inv) => inv.id)) + 1
//         : 1;

//     const assetClassExists =
//       Array.isArray(investments) &&
//       investments.some((inv) => inv.name === selectedAssetClass);

//     let updatedInvestments: Investment[];

//     if (assetClassExists) {
//       updatedInvestments = investments.map((inv) => {
//         if (inv.name === selectedAssetClass) {
//           return {
//             ...inv,
//             subData: [...(inv.subData || []), { ...newInvestment, id: newId }],
//           };
//         }
//         return inv;
//       });
//     } else {
//       if (Array.isArray(investments)) {
//         updatedInvestments = [
//           ...investments,
//           { ...newInvestment, id: newId, name: selectedAssetClass },
//         ];
//       } else {
//         updatedInvestments = [
//           { ...newInvestment, id: newId, name: selectedAssetClass },
//         ];
//       }
//     }

//     setInvestments(updatedInvestments);
//     setShowAddForm(false);
//     setNewInvestment({
//       id: newId + 1,
//       name: "",
//       invested: 0,
//       current: 0,
//       percentage: 0,
//     });
//     setSelectedAssetClass("");

//     postInvestmentData(updatedInvestments);
//   };

//   const totalInvested = Array.isArray(investments)
//     ? investments.reduce((acc, inv) => acc + inv.invested, 0)
//     : 0;
//   const totalCurrent = Array.isArray(investments)
//     ? investments.reduce((acc, inv) => acc + inv.current, 0)
//     : 0;

//   useEffect(() => {
//     if (Array.isArray(investments)) {
//       const updatedInvestments = investments.map((inv) => {
//         const returnAmount = inv.current - inv.invested;
//         const returnPercentage = inv.invested
//           ? (returnAmount / inv.invested) * 100
//           : 0;
//         const formattedReturn = `${
//           returnAmount >= 0 ? "₹" : "-₹"
//         } ${formatIndianNumber(Math.abs(returnAmount))} | ${
//           returnPercentage >= 0 ? "+" : ""
//         }${returnPercentage.toFixed(0)}%`;

//         return {
//           ...inv,
//           percentage: totalInvested ? (inv.invested / totalInvested) * 100 : 0,
//           return: formattedReturn,
//         };
//       });
//       setInvestments(updatedInvestments);
//     }
//   }, [totalInvested]);

//   const getSubtableName = (name: string) => {
//     switch (name) {
//       case "Mutual Funds":
//         return "Fund Name";
//       case "Stocks":
//         return "Stock Name";
//       case "Cash in Bank":
//         return "Bank Name";
//       case "Fixed Deposit":
//         return "Bank Name";
//       case "Gold":
//         return "Form/Account";
//       default:
//         return "Platform Name";
//     }
//   };

//   return (
//     <div className="mx-auto p-4 md:p-8 rounded-2xl">
//       <div className="flex justify-end gap-4 mb-4">
//         <button
//           onClick={handleEditClick}
//           className={`font-semibold text-white px-4 py-2 rounded-xl flex gap-2 items-center ${
//             isEditing ? "bg-green-700" : "bg-[#01c8a9]"
//           }`}
//           disabled={investments.length === 0}
//         >
//           <FaPencilAlt />
//           {isEditing ? "Save Table" : "Edit Table"}
//         </button>
//         <button
//           onClick={handleAddRow}
//           className="bg-[#01C8A9] font-semibold text-white px-4 py-2 rounded-xl flex gap-2 items-center"
//         >
//           <IoAddCircleOutline />
//           Add another row
//         </button>
//       </div>
//       <div className="px-4 bg-white rounded-2xl shadow-md shadow-[#60a1c2] min-w-full">
//         <table className="w-full">
//           <thead>
//             <tr className="text-[#035782]">
//               <th className="p-4 pt-8 border-b text-start font-medium">
//                 Investment
//               </th>
//               <th className="p-4 pt-8 border-b text-right font-medium">
//                 Invested
//               </th>
//               <th className="p-4 pt-8 border-b text-right hidden md:flex font-medium justify-end">
//                 Current
//               </th>
//               <th className="p-4 pt-8 border-b text-right font-medium">
//                 Return
//               </th>
//               <th className="p-4 pt-8 border-b text-right hidden md:flex font-medium justify-end">
//                 % Of Portfolio
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {Array.isArray(investments) &&
//               investments.map((inv) => (
//                 <React.Fragment key={inv.id}>
//                   <tr
//                     className={`${
//                       expandedRow === inv.id && inv.subData ? "" : "border-b"
//                     }`}
//                   >
//                     {/* Main table row */}
//                     <td className="py-4 px-4">
//                       {(isEditing && inv.name === "") ||
//                       editingRows.includes(inv.id) ? (
//                         <input
//                           type="text"
//                           value={inv.name}
//                           onChange={(e) =>
//                             handleInputChange(inv.id, e.target.value, "name")
//                           }
//                           className="w-full border border-gray-300 rounded px-2 py-1"
//                         />
//                       ) : (
//                         <div className="flex items-center justify-between">
//                           <div className="font-semibold text-[#035782]">
//                             {inv.name}
//                           </div>
//                           <div className="flex items-center gap-2">
//                             {inv.subData && (
//                               <button onClick={() => handleExpandClick(inv.id)}>
//                                 {expandedRow === inv.id ? (
//                                   <IoChevronUp />
//                                 ) : (
//                                   <IoChevronDown />
//                                 )}
//                               </button>
//                             )}
//                           </div>
//                         </div>
//                       )}
//                     </td>
//                     <td className="py-2 px-4 text-right">
//                       {isEditing && inv.name !== "Mutual Funds" ? (
//                         <input
//                           type="number"
//                           value={inv.invested}
//                           onChange={(e) =>
//                             handleInputChange(
//                               inv.id,
//                               parseInt(e.target.value, 10),
//                               "invested"
//                             )
//                           }
//                           className="w-full border border-gray-300 rounded px-2 py-1"
//                           style={{
//                             WebkitAppearance: "none",
//                             MozAppearance: "textfield",
//                           }}
//                         />
//                       ) : (
//                         <span>{`₹${formatIndianNumber(inv.invested)}`}</span>
//                       )}
//                     </td>
//                     <td className="py-2 px-4 hidden md:flex mt-2 justify-end md:pl-20">
//                       {isEditing && inv.name !== "Mutual Funds" ? (
//                         <input
//                           type="number"
//                           value={inv.current}
//                           onChange={(e) =>
//                             handleInputChange(
//                               inv.id,
//                               parseInt(e.target.value, 10),
//                               "current"
//                             )
//                           }
//                           className="w-full border border-gray-300 rounded px-2 py-1"
//                           style={{
//                             WebkitAppearance: "none",
//                             MozAppearance: "textfield",
//                           }}
//                         />
//                       ) : (
//                         <span>{`₹${formatIndianNumber(inv.current)}`}</span>
//                       )}
//                     </td>
//                     <td className="py-2 px-4 text-right">
//                       {inv.invested === 0 || inv.current === 0
//                         ? inv.return?.replace(/(\s\+\d+%|\s-\d+%)/, " NA")
//                         : inv.return}
//                     </td>
//                     <td className="py-2 px-4 hidden md:flex mt-2 justify-end">
//                       {inv.percentage.toFixed(2)}%
//                     </td>
//                   </tr>
//                   {expandedRow === inv.id && inv.subData && (
//                     <tr>
//                       <td colSpan={6} className="pb-2 px-4">
//                         <table className="min-w-full bg-white border-gray-200 mt-2 border-t">
//                           <thead>
//                             <tr className="text-[#035782]">
//                               <th className="border-b text-start font-medium px-0 py-2">
//                                 {getSubtableName(inv.name)}
//                               </th>
//                               <th className="border-b hidden md:flex font-medium justify-start px-0 py-2 md:pl-3">
//                                 Invested
//                               </th>
//                               <th className="border-b font-medium text-start md:text-end px-0 py-2">
//                                 Current
//                               </th>
//                               <th className="border-b font-medium text-end px-0 py-2">
//                                 Return
//                               </th>
//                               <th className="border-b"></th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {inv.subData.map((sub) => {
//                               const subReturnAmount =
//                                 sub.current - sub.invested;
//                               const subReturnPercentage = sub.invested
//                                 ? (subReturnAmount / sub.invested) * 100
//                                 : 0;
//                               const subFormattedReturn = `${
//                                 subReturnAmount >= 0 ? "₹" : "-₹"
//                               } ${Math.abs(subReturnAmount).toLocaleString(
//                                 "en-IN"
//                               )} | ${
//                                 subReturnPercentage >= 0 ? "+" : ""
//                               }${subReturnPercentage.toFixed(0)}%`;

//                               return (
//                                 <tr
//                                   key={sub.id}
//                                   className="text-sm md:text-base"
//                                 >
//                                   <td className="border-b px-0 py-1">
//                                     {isEditing &&
//                                     (editingSubRows[inv.id]?.includes(sub.id) ||
//                                       false) ? (
//                                       <input
//                                         type="text"
//                                         value={sub.name}
//                                         onChange={(e) =>
//                                           handleSubRowInputChange(
//                                             inv.id,
//                                             sub.id,
//                                             e.target.value,
//                                             "name"
//                                           )
//                                         }
//                                         className="w-full border border-gray-300 rounded px-2 py-1"
//                                       />
//                                     ) : (
//                                       <div className="flex items-center justify-between">
//                                         <div>{sub.name}</div>
//                                         {isEditing && (
//                                           <button
//                                             onClick={() =>
//                                               handleSubRowEditClick(
//                                                 inv.id,
//                                                 sub.id
//                                               )
//                                             }
//                                           >
//                                             <FaPencilAlt />
//                                           </button>
//                                         )}
//                                       </div>
//                                     )}
//                                   </td>
//                                   <td className="border-b hidden md:flex px-0 py-1 justify-start md:pl-2">
//                                     {isEditing &&
//                                     (editingSubRows[inv.id]?.includes(sub.id) ||
//                                       false) ? (
//                                       <input
//                                         type="number"
//                                         value={sub.invested}
//                                         onChange={(e) =>
//                                           handleSubRowInputChange(
//                                             inv.id,
//                                             sub.id,
//                                             parseInt(e.target.value, 10),
//                                             "invested"
//                                           )
//                                         }
//                                         className="w-full border border-gray-300 rounded px-2 py-1"
//                                         style={{
//                                           WebkitAppearance: "none",
//                                           MozAppearance: "textfield",
//                                         }}
//                                       />
//                                     ) : (
//                                       <span>{`₹${formatIndianNumber(
//                                         sub.invested
//                                       )}`}</span>
//                                     )}
//                                   </td>
//                                   <td className="border-b px-0 py-1 text-end">
//                                     {isEditing &&
//                                     (editingSubRows[inv.id]?.includes(sub.id) ||
//                                       false) ? (
//                                       <input
//                                         type="number"
//                                         value={sub.current}
//                                         onChange={(e) =>
//                                           handleSubRowInputChange(
//                                             inv.id,
//                                             sub.id,
//                                             parseInt(e.target.value, 10),
//                                             "current"
//                                           )
//                                         }
//                                         className="w-full border border-gray-300 rounded px-2 py-1"
//                                         style={{
//                                           WebkitAppearance: "none",
//                                           MozAppearance: "textfield",
//                                         }}
//                                       />
//                                     ) : (
//                                       <span>{`₹${formatIndianNumber(
//                                         sub.current
//                                       )}`}</span>
//                                     )}
//                                   </td>
//                                   <td className="border-b px-0 py-1 text-end">
//                                     {sub.invested === 0 || sub.current === 0
//                                       ? subFormattedReturn?.replace(
//                                           /(\s\+\d+%|\s-\d+%)/,
//                                           " NA"
//                                         )
//                                       : subFormattedReturn}
//                                   </td>
//                                   <td className="hidden-value border-b w-1/5 h-10"></td>
//                                 </tr>
//                               );
//                             })}
//                           </tbody>
//                         </table>
//                       </td>
//                     </tr>
//                   )}
//                 </React.Fragment>
//               ))}
//             <tr className="border-t-2">
//               <td className="p-4 pb-8 border-t font-bold text-[#035782]">
//                 Total
//               </td>
//               <td className="p-4 pb-8 border-t font-bold text-right whitespace-nowrap">
//                 ₹ {formatIndianNumber(totalInvested)}
//               </td>
//               <td className="p-4 pb-8 border-t font-bold hidden md:flex justify-end">
//                 ₹ {formatIndianNumber(totalCurrent)}
//               </td>
//               <td className="p-4 pb-8 border-t font-bold text-right">
//                 <div className="">
//                   <span className="whitespace-nowrap">
//                     {totalCurrent - totalInvested >= 0 ? (
//                       <span className="whitespace-nowrap">₹ +</span>
//                     ) : (
//                       ""
//                     )}
//                     {(totalCurrent - totalInvested).toLocaleString("en-IN")} |
//                   </span>
//                   <span>
//                     {" "}
//                     {totalInvested
//                       ? (
//                           ((totalCurrent - totalInvested) / totalInvested) *
//                           100
//                         ).toFixed(2)
//                       : 0}
//                     %
//                   </span>
//                 </div>
//               </td>
//               <td className="p-4 pb-8 border-t font-bold hidden md:flex justify-end">
//                 100%
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//       {showAddForm && (
//         <div className="mt-4 p-4 flex gap-8 itemscenter flex-col md:flex-row justify-center pt-5 bg-white rounded-xl">
//           <div className="mb-2 w-full md:max-w-sm">
//             <select
//               value={selectedAssetClass}
//               onChange={handleAssetClassChange}
//               className="w-full px-2 py-1 rounded-xl pr-6 outline-none bg-white border"
//             >
//               <option value="" disabled>
//                 Select Asset Class
//               </option>
//               <option value="Stocks">Stocks</option>
//               <option value="Cash in Bank">Cash in Bank</option>
//               <option value="Fixed Deposit">Fixed Deposit</option>
//               <option value="Gold">Gold</option>
//               <option value="PPF">PPF</option>
//               <option value="EPF">EPF</option>
//               <option value="Leasing Assets">Leasing Assets</option>
//               <option value="Real Estate">Real Estate</option>
//               <option value="Crypto">Crypto</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>
//           <div className="mb-2 w-full">
//             <input
//               type="text"
//               value={newInvestment.name}
//               placeholder="Name"
//               onChange={(e) => handleFormChange("name", e.target.value)}
//               className="w-full border border-gray-300 px-2 py-1 h-full rounded-xl"
//             />
//           </div>
//           <div className="mb-2 w-full">
//             <input
//               type="number"
//               placeholder="Invested"
//               value={newInvestment.invested === 0 ? "" : newInvestment.invested}
//               onChange={(e) =>
//                 handleFormChange(
//                   "invested",
//                   e.target.value === "" ? 0 : parseInt(e.target.value, 10)
//                 )
//               }
//               className="w-full border border-gray-300  px-2 py-1 rounded-xl"
//               style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
//             />
//           </div>
//           <div className="mb-2 w-full">
//             <input
//               type="number"
//               placeholder="Current"
//               value={newInvestment.current === 0 ? "" : newInvestment.current}
//               onChange={(e) =>
//                 handleFormChange("current", parseInt(e.target.value, 10))
//               }
//               className="w-full border border-gray-300  px-2 py-1 rounded-xl"
//               style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
//             />
//           </div>
//           <div>
//             <button
//               onClick={handleSubmitNewRow}
//               className="bg-[#01C8A9] font-medium text-white px-4 py-1.5 rounded-xl "
//             >
//               Submit
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default InvestmentTable;
