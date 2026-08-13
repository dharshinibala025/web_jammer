import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { FiUpload, FiX, FiCheck, FiAlertTriangle, FiFileText, FiDownload } from 'react-icons/fi';

export const ExcelImportModal = ({ isOpen, onClose, onImportSuccess }) => {
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

    // Standardize column names
    const rows = rawJson.map((r, index) => {
      const regNo = r['Register Number'] || r['registerNumber'] || r['Reg No'] || r['RegisterNo'] || '';
      const name = r['Name'] || r['Student Name'] || r['name'] || '';
      const year = r['Year'] || r['year'] || '1st Year';
      const section = r['Section'] || r['section'] || 'A';
      const email = r['Email'] || r['email'] || `${String(regNo).toLowerCase()}@ksrce.ac.in`;
      const phone = r['Phone'] || r['phone'] || '9876543210';

      const isValid = Boolean(regNo && name);
      return {
        rowIndex: index + 2, // 1-based header is line 1
        registerNumber: String(regNo).trim(),
        name: String(name).trim(),
        year: String(year).trim(),
        section: String(section).trim().toUpperCase(),
        department: 'CSE',
        email: String(email).trim(),
        phone: String(phone).trim(),
        status: 'Active',
        isValid,
        error: !isValid ? 'Missing Register Number or Name' : null,
      };
    });

    const errs = [];
    const invalidCount = rows.filter((r) => !r.isValid).length;
    if (invalidCount > 0) {
      errs.push(`${invalidCount} row(s) contain missing or invalid required data.`);
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
    // Generate a sample workbook programmatically using SheetJS
    const sampleData = [
      { 'Register Number': '24CS021', 'Name': 'Aravind S', 'Year': '1st Year', 'Section': 'A', 'Department': 'CSE', 'Email': 'aravind.s@ksrce.ac.in', 'Phone': '9876500001' },
      { 'Register Number': '24CS022', 'Name': 'Bhavani M', 'Year': '1st Year', 'Section': 'A', 'Department': 'CSE', 'Email': 'bhavani.m@ksrce.ac.in', 'Phone': '9876500002' },
      { 'Register Number': '24CS023', 'Name': 'Deepak R', 'Year': '1st Year', 'Section': 'B', 'Department': 'CSE', 'Email': 'deepak.r@ksrce.ac.in', 'Phone': '9876500003' },
      { 'Register Number': '24CS024', 'Name': 'Elango P', 'Year': '1st Year', 'Section': 'B', 'Department': 'CSE', 'Email': 'elango.p@ksrce.ac.in', 'Phone': '9876500004' },
    ];

    const worksheet = XLSX.utils.json_to_sheet(sampleData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');
    setFile({ name: 'GoogleForm_CSE_Students_Sample.xlsx' });
    processWorkbook(workbook);
  };

  const handleConfirmImport = () => {
    const validRows = parsedRows.filter((r) => r.isValid);
    if (validRows.length === 0) {
      setValidationErrors(['No valid student rows available to import.']);
      return;
    }

    const importedCount = onImportSuccess(validRows);
    setSuccessMessage(`Successfully imported ${importedCount} CSE students!`);
    setTimeout(() => {
      handleReset();
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#111827]/40 backdrop-blur-xs p-4">
      <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5E7EB] shadow-xl w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB] bg-[#F8FAFC]">
          <div>
            <h3 className="text-sm font-semibold text-[#111827]">
              Upload Student Excel (Google Form Export)
            </h3>
            <p className="text-xs font-normal text-[#6B7280]">
              Import CSE student records collected from Google Form exports (.xlsx, .xls)
            </p>
          </div>
          <button onClick={() => { handleReset(); onClose(); }} className="text-[#6B7280] hover:text-[#111827] p-1">
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">

          <div className="bg-[#EFF6FF] border border-[#60A5FA]/30 rounded-xl p-3 text-xs font-medium text-[#111827] flex items-center justify-between flex-wrap gap-2">
            <span className="bg-white px-2 py-1 rounded border border-[#E5E7EB]">1. Google Form</span>
            <span className="text-[#3B82F6]">→</span>
            <span className="bg-white px-2 py-1 rounded border border-[#E5E7EB]">2. Excel File (.xlsx)</span>
            <span className="text-[#3B82F6]">→</span>
            <span className="bg-white px-2 py-1 rounded border border-[#E5E7EB]">3. In-Browser Validation</span>
            <span className="text-[#3B82F6]">→</span>
            <span className="bg-[#3B82F6] text-white px-2 py-1 rounded">4. Manage Students</span>
          </div>

          {!parsedRows.length && (
            <div className="border-2 border-dashed border-[#E5E7EB] hover:border-[#3B82F6] rounded-2xl p-8 text-center bg-[#F8FAFC] transition-colors">
              <FiUpload className="w-8 h-8 text-[#3B82F6] mx-auto mb-2" />
              <p className="text-sm font-semibold text-[#111827]">Click or drag Excel file to upload</p>
              <p className="text-xs text-[#6B7280] mt-1 font-normal">Supported formats: .xlsx, .xls, .csv</p>

              <div className="mt-4 flex items-center justify-center space-x-3">
                <label className="px-4 py-2 rounded-xl bg-[#3B82F6] text-white font-medium text-xs cursor-pointer hover:bg-[#2563EB] transition-colors shadow-xs">
                  Browse Excel File
                  <input
                    type="file"
                    accept=".xlsx, .xls, .csv"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                <button
                  type="button"
                  onClick={handleLoadSampleData}
                  className="px-4 py-2 rounded-xl border border-[#E5E7EB] bg-[#FFFFFF] text-[#111827] font-medium text-xs hover:bg-[#EFF6FF] hover:text-[#3B82F6] transition-colors flex items-center space-x-1.5"
                >
                  <FiFileText className="w-3.5 h-3.5" />
                  <span>Load Sample CSE Data</span>
                </button>
              </div>
            </div>
          )}

          {successMessage && (
            <div className="p-3 bg-[#DCFCE7] border border-[#10B981]/30 rounded-xl text-xs font-medium text-[#10B981] flex items-center space-x-2">
              <FiCheck className="w-4 h-4" />
              <span>{successMessage}</span>
            </div>
          )}

          {validationErrors.map((err, i) => (
            <div key={i} className="p-3 bg-[#FEE2E2] border border-[#EF4444]/30 rounded-xl text-xs font-medium text-[#EF4444] flex items-center space-x-2">
              <FiAlertTriangle className="w-4 h-4 shrink-0" />
              <span>{err}</span>
            </div>
          ))}

          {parsedRows.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#111827]">
                  Preview ({parsedRows.filter((r) => r.isValid).length} Valid Students Ready to Import)
                </span>
                <button
                  onClick={handleReset}
                  className="text-xs font-medium text-[#EF4444] hover:underline"
                >
                  Choose Different File
                </button>
              </div>

              <div className="border border-[#E5E7EB] rounded-xl overflow-hidden max-h-60 overflow-y-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F8FAFC] border-b border-[#E5E7EB] text-[10px] font-semibold text-[#6B7280] uppercase">
                    <tr>
                      <th className="p-2">Reg Number</th>
                      <th className="p-2">Name</th>
                      <th className="p-2">Year</th>
                      <th className="p-2">Sec</th>
                      <th className="p-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E7EB] font-normal">
                    {parsedRows.map((r, i) => (
                      <tr key={i} className={r.isValid ? '' : 'bg-[#FEE2E2]/30'}>
                        <td className="p-2 font-mono font-medium">{r.registerNumber || '-'}</td>
                        <td className="p-2 font-medium">{r.name || '-'}</td>
                        <td className="p-2 text-[#6B7280]">{r.year}</td>
                        <td className="p-2 text-[#6B7280]">{r.section}</td>
                        <td className="p-2">
                          {r.isValid ? (
                            <span className="text-[#10B981] font-medium text-[11px]">Valid</span>
                          ) : (
                            <span className="text-[#EF4444] font-medium text-[11px]">{r.error}</span>
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

        <div className="flex items-center justify-between px-6 py-4 border-t border-[#E5E7EB] bg-[#F8FAFC]">
          <button
            type="button"
            onClick={handleDownloadTemplate}
            className="text-xs font-medium text-[#3B82F6] hover:underline flex items-center space-x-1"
          >
            <FiDownload className="w-3.5 h-3.5" />
            <span>Download Blank Template</span>
          </button>

          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => { handleReset(); onClose(); }}
              className="px-4 py-2 rounded-xl border border-[#E5E7EB] bg-[#FFFFFF] text-xs font-medium text-[#6B7280] hover:bg-[#F8FAFC]"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!parsedRows.length || loading || parsedRows.filter((r) => r.isValid).length === 0}
              onClick={handleConfirmImport}
              className="px-5 py-2 rounded-xl bg-[#3B82F6] text-white text-xs font-medium hover:bg-[#2563EB] shadow-xs disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1.5"
            >
              <FiCheck className="w-4 h-4" />
              <span>Confirm & Import Students</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ExcelImportModal;
