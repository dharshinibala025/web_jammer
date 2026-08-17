import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { FiUpload, FiX, FiCheck, FiAlertTriangle, FiFileText, FiDownload } from 'react-icons/fi';

export const StaffExcelImportModal = ({ isOpen, onClose, onImportSuccess }) => {
  const [file, setFile] = useState(null);
  const [parsedRows, setParsedRows] = useState([]);
  const [validationErrors, setValidationErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const handleReset = () => {
    setFile(null);
    setParsedRows([]);
    setValidationErrors([]);
    setLoading(false);
    setSuccessMessage('');
  };

  const processWorkbook = (workbook) => {
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rawJson = XLSX.utils.sheet_to_json(sheet, { defval: '' });

    if (!rawJson || rawJson.length === 0) {
      setValidationErrors(['Excel file is empty or missing data rows.']);
      setParsedRows([]);
      return;
    }

    // Standardize column names for Staff / Faculty members
    const rows = rawJson.map((r, index) => {
      const staffId = r['Staff ID'] || r['staffId'] || r['ID'] || r['Employee ID'] || r['StaffId'] || '';
      const name = r['Name'] || r['Staff Name'] || r['Faculty Name'] || r['name'] || '';
      const designation = r['Designation'] || r['designation'] || r['Role'] || 'Assistant Professor';
      const advisorType = r['Advisor Type'] || r['advisorType'] || r['Advisor'] || 'CA1';
      const year = r['Year'] || r['year'] || r['Academic Year'] || '1st Year';
      const section = r['Section'] || r['section'] || 'A';
      const email = r['Email'] || r['email'] || `${String(name).toLowerCase().replace(/\s+/g, '.')}@ksrce.ac.in`;
      const phone = r['Phone'] || r['phone'] || r['Mobile'] || '9876543210';

      const isValid = Boolean(staffId && name);
      return {
        rowIndex: index + 2,
        staffId: String(staffId).trim(),
        name: String(name).trim(),
        designation: String(designation).trim(),
        advisorType: String(advisorType).trim().toUpperCase(),
        year: String(year).trim(),
        section: String(section).trim().toUpperCase(),
        department: 'CSE',
        email: String(email).trim(),
        phone: String(phone).trim(),
        isValid,
        error: !isValid ? 'Missing Staff ID or Name' : null,
      };
    });

    const errs = [];
    const invalidCount = rows.filter((r) => !r.isValid).length;
    if (invalidCount > 0) {
      errs.push(`${invalidCount} row(s) contain missing required data (Staff ID or Name).`);
    }

    setParsedRows(rows);
    setValidationErrors(errs);
  };

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;

    const fileExt = uploadedFile.name.split('.').pop().toLowerCase();
    if (fileExt !== 'xlsx' && fileExt !== 'xls' && fileExt !== 'csv') {
      setValidationErrors(['Invalid file format. Please upload a valid .xlsx, .xls, or .csv Excel file.']);
      return;
    }

    setFile(uploadedFile);
    setLoading(true);
    setValidationErrors([]);
    setSuccessMessage('');

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = new Uint8Array(evt.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        processWorkbook(workbook);
      } catch (err) {
        setValidationErrors(['Failed to read Excel file. Please ensure it is not corrupted.']);
      } finally {
        setLoading(false);
      }
    };
    reader.readAsArrayBuffer(uploadedFile);
  };

  const handleLoadSampleData = () => {
    const sampleData = [
      { 'Staff ID': 'STF105', 'Name': 'Dr. M. Senthilkumar', 'Designation': 'Associate Professor', 'Advisor Type': 'CA1', 'Year': '3rd Year', 'Section': 'A', 'Email': 'senthilkumar.m@ksrce.ac.in', 'Phone': '9876511001' },
      { 'Staff ID': 'STF106', 'Name': 'Prof. R. Kavitha', 'Designation': 'Assistant Professor', 'Advisor Type': 'CA2', 'Year': '3rd Year', 'Section': 'B', 'Email': 'kavitha.r@ksrce.ac.in', 'Phone': '9876511002' },
      { 'Staff ID': 'STF107', 'Name': 'Dr. V. Rajesh', 'Designation': 'Professor', 'Advisor Type': 'CA1', 'Year': '4th Year', 'Section': 'A', 'Email': 'rajesh.v@ksrce.ac.in', 'Phone': '9876511003' },
    ];

    const worksheet = XLSX.utils.json_to_sheet(sampleData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Faculty');
    setFile({ name: 'CSE_Faculty_Import_Sample.xlsx' });
    processWorkbook(workbook);
  };

  const handleConfirmImport = () => {
    const validRows = parsedRows.filter((r) => r.isValid);
    if (validRows.length === 0) {
      setValidationErrors(['No valid staff rows available to import.']);
      return;
    }

    const importedCount = onImportSuccess(validRows);
    setSuccessMessage(`Successfully imported ${importedCount} CSE faculty records!`);
    setTimeout(() => {
      handleReset();
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#111827]/40 backdrop-blur-xs p-4">
      <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5E7EB] shadow-xl w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 text-left">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB] bg-[#F8FAFC]">
          <div>
            <h3 className="text-sm font-semibold text-[#111827]">
              Upload Faculty Excel Sheet
            </h3>
            <p className="text-xs font-normal text-[#6B7280]">
              Import CSE faculty and staff records from Excel (.xlsx, .xls, .csv)
            </p>
          </div>
          <button onClick={() => { handleReset(); onClose(); }} className="text-[#6B7280] hover:text-[#111827] p-1 cursor-pointer">
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">

          {/* Guidelines Box */}
          <div className="bg-[#EFF6FF] border border-[#60A5FA]/30 rounded-xl p-3 text-xs font-medium text-[#111827] flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center space-x-2">
              <span className="bg-white px-2 py-1 rounded border border-[#E5E7EB]">1. Excel File (.xlsx)</span>
              <span className="text-[#6B7280]">Required Columns: <strong>Staff ID</strong>, <strong>Name</strong>, Designation, Advisor Type, Year, Section, Email, Phone</span>
            </div>
            <button
              onClick={handleLoadSampleData}
              type="button"
              className="text-xs text-[#2563EB] hover:underline font-semibold flex items-center space-x-1 bg-white px-2.5 py-1 rounded-lg border border-[#DBEAFE] cursor-pointer"
            >
              <FiDownload className="w-3.5 h-3.5" />
              <span>Load Demo Excel Data</span>
            </button>
          </div>

          {/* File Upload Box */}
          {!file && (
            <label className="border-2 border-dashed border-[#D1D5DB] hover:border-[#2563EB] rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors bg-[#F9FAFB] hover:bg-[#EFF6FF]/40">
              <FiUpload className="w-10 h-10 text-[#2563EB] mb-2" />
              <p className="text-sm font-semibold text-[#111827]">Click or drag Excel file to upload</p>
              <p className="text-xs text-[#6B7280] mt-1">Supports Microsoft Excel (.xlsx, .xls) and CSV</p>
              <input
                type="file"
                accept=".xlsx, .xls, .csv"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          )}

          {/* Selected File Card */}
          {file && (
            <div className="flex items-center justify-between bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl p-3 text-xs">
              <div className="flex items-center space-x-3">
                <FiFileText className="w-6 h-6 text-[#2563EB]" />
                <div>
                  <p className="font-semibold text-[#111827]">{file.name}</p>
                  <p className="text-[#6B7280] text-[11px]">
                    {parsedRows.length} total rows parsed ({parsedRows.filter((r) => r.isValid).length} valid)
                  </p>
                </div>
              </div>
              <button
                onClick={handleReset}
                className="text-[#DC2626] hover:underline font-medium cursor-pointer"
              >
                Change File
              </button>
            </div>
          )}

          {/* Validation Warnings */}
          {validationErrors.length > 0 && (
            <div className="bg-[#FEF2F2] border border-[#FCA5A5] rounded-xl p-3 text-xs text-[#991B1B] space-y-1">
              <div className="flex items-center space-x-1.5 font-semibold">
                <FiAlertTriangle className="w-4 h-4 text-[#DC2626]" />
                <span>Validation Alerts</span>
              </div>
              <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                {validationErrors.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="bg-[#ECFDF5] border border-[#6EE7B7] rounded-xl p-3 text-xs text-[#065F46] flex items-center space-x-2 font-semibold">
              <FiCheck className="w-4 h-4 text-[#059669]" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Data Preview Table */}
          {parsedRows.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-[#111827]">
                <span>Preview Parsed Faculty Data</span>
                <span className="text-[#6B7280] font-normal text-[11px]">
                  Showing first {Math.min(parsedRows.length, 5)} of {parsedRows.length} rows
                </span>
              </div>

              <div className="border border-[#E5E7EB] rounded-xl overflow-hidden max-h-48 overflow-y-auto text-xs">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-[#F8FAFC] border-b border-[#E5E7EB] text-[#4B5563] font-semibold">
                    <tr>
                      <th className="p-2.5">Staff ID</th>
                      <th className="p-2.5">Name</th>
                      <th className="p-2.5">Designation</th>
                      <th className="p-2.5">Advisor</th>
                      <th className="p-2.5">Year & Sec</th>
                      <th className="p-2.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E7EB]">
                    {parsedRows.slice(0, 5).map((r, i) => (
                      <tr key={i} className={!r.isValid ? 'bg-[#FEF2F2]' : 'hover:bg-[#F9FAFB]'}>
                        <td className="p-2.5 font-medium text-[#111827]">{r.staffId || '-'}</td>
                        <td className="p-2.5 font-semibold text-[#111827]">{r.name || '-'}</td>
                        <td className="p-2.5 text-[#4B5563]">{r.designation}</td>
                        <td className="p-2.5 text-[#4B5563]">{r.advisorType}</td>
                        <td className="p-2.5 text-[#4B5563]">{r.year} {r.section}</td>
                        <td className="p-2.5">
                          {r.isValid ? (
                            <span className="inline-flex items-center space-x-1 text-[#059669] font-medium text-[11px]">
                              <FiCheck className="w-3.5 h-3.5" />
                              <span>Valid</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center space-x-1 text-[#DC2626] font-medium text-[11px]">
                              <FiAlertTriangle className="w-3.5 h-3.5" />
                              <span>{r.error}</span>
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end space-x-3 px-6 py-4 border-t border-[#E5E7EB] bg-[#F8FAFC]">
          <button
            type="button"
            onClick={() => { handleReset(); onClose(); }}
            className="px-4 py-2 rounded-xl border border-[#D1D5DB] bg-[#FFFFFF] text-xs font-medium text-[#374151] hover:bg-[#F3F4F6] cursor-pointer"
          >
            Cancel
          </button>
          
          <button
            type="button"
            disabled={parsedRows.filter((r) => r.isValid).length === 0 || loading}
            onClick={handleConfirmImport}
            className={`px-4 py-2 rounded-xl text-xs font-medium text-[#FFFFFF] transition-colors cursor-pointer flex items-center space-x-1.5 ${
              parsedRows.filter((r) => r.isValid).length > 0 && !loading
                ? 'bg-[#2563EB] hover:bg-[#1D4ED8]'
                : 'bg-[#9CA3AF] cursor-not-allowed'
            }`}
          >
            <FiUpload className="w-3.5 h-3.5" />
            <span>Confirm & Import ({parsedRows.filter((r) => r.isValid).length} Rows)</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default StaffExcelImportModal;
