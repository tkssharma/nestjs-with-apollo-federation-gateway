export interface CsvDataTemplate {
    contract_type: string;
    // remaining optional
    supplier_id?: string;
    supplier_name?: string;
    title?: string;
    payment_frequency?: string;
    currency?: string;
    amount?: string;
    payment_date?: string;
    payment_terms?: string;
    ends_at?: string;
    starts_at?: string;
    description?: string;
}
export interface CsvInvoiceDataTemplate {
  payment_date?: string;
  amount?: string;
  // remaining optional
  supplier_id?: string;
  supplier_name?: string;
  title?: string;
  cost_center?: string;
  cost_center_name?: string;
  description?: string;
  invoice_number?: string;
  category?: string;
  currency?: string;
  issue_date?: string;
}
