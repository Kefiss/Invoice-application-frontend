import { Link, useParams, useNavigate } from "react-router-dom";
import invoiceService from "../services/invoice.service";
import React, { useEffect, useState, useRef } from "react";
import "../styles/invoice.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useReactToPrint } from "react-to-print";
import codeAcademy from "../images/codeacademy.png";
import AuthService from "../services/auth.service";
import { t } from "i18next";

const InvoicePreview = () => {
  const [invoice, setInvoice] = useState([]);
  const [invoiceItems, setInvoiceItems] = useState([]);
  const { id } = useParams();
  const [customerId, setCustomerId] = useState([]);
  const [suma, setSuma] = useState([]);
  const [bendraSuma, setBendraSuma] = useState("");
  const [bendraSumaSuPvm, setBendraSumaSuPvm] = useState("");
  const [PVM, SetPvm] = useState([]);
  const user = AuthService.getCurrentUser();
  const navigate = useNavigate();

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    if (id) {
      invoiceService
        .get(id)
        .then((response) => {
          console.log("Printing Invoices data", response.data);
          setInvoiceItems(response.data.invoiceItems);
          setCustomerId(response.data.customerId);
          setInvoice(response.data);
          countSuma(response.data.invoiceItems);
        })
        .catch((error) => {
          console.log("Something went wrong", error);
        });
    }
  }, []);

  let countSuma = (invoiceItems) => {
    setBendraSuma(0);
    var sumaCount = 0;
    const list = [...suma];
    invoiceItems.map(
      (item, index) => (
        (list[index] =
          // invoiceItems[index].item.bazineKaina *
          invoiceItems[index].price *
          Number(invoiceItems[index].quantity)),
        setSuma(list),
        console.log("numeris: " + list[index]), /////////
        (sumaCount += list[index]),
        setBendraSuma(sumaCount.toFixed(2)),
        setBendraSumaSuPvm((sumaCount * 1.21).toFixed(2)),
        SetPvm((sumaCount * 0.21).toFixed(2))
      )
    );
  };
  


  return (
    <div className="saskaitos-sablonas">
      <div style={{ textAlign: "center" }}>
        <button onClick={handlePrint} className="btn btn-outline-primary">
        {t('btnPrint')}
        </button>
        <button onClick={() => navigate(-1)} className="btn btn-outline-primary">
        {t('btnBack')}
        </button>
      </div>
      <div className="bendras" ref={componentRef}>
        <img className="invoice-logo" src={codeAcademy} alt='logo'/>

        <table className="sask-info">
          <tbody>
            <tr>
              <td>
                <span>{t("invoiceNumber")}: </span>
                {invoice.invoiceNumber}
              </td>
              <td></td>
            </tr>

            <tr>
              <td>
                <span>{t("customer")}: </span>
                {customerId.vardas} {customerId.pavarde}
              </td>
              <td></td>
            </tr>

            <tr>
              <td>
                <span>{t("date")}: </span>
                {invoice.myDate}
              </td>
              <td></td>
            </tr>

            <tr>
              <td>
                <span>{t("customerAddress")}: </span>
                {customerId.adresas}
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>

        <table className="line-items-container">
          <thead>
            <tr>
              <th className="heading-description">{t("itemcode")}</th>
              <th className="heading-description">{t("itemname")}</th>
              <th className="heading-quantity">{t("quantity")}</th>
              <th className="heading-price">{t("price")}</th>
              <th className="heading-subtotal">{t("sum")}</th>
            </tr>
          </thead>
          <tbody className="item">
            {invoiceItems.map((item, index) => (
              <tr key={index}>
                <td> {invoiceItems[index].item.kodas} </td>
                <td> {invoiceItems[index].item.pavadinimas} </td>
                <td> {invoiceItems[index].quantity} </td>
                <td style={{ textAlign: "right" }}>
                  {" "}
                  {invoiceItems[index].price}{" "}
                </td>
                <td> {suma[index].toFixed(2)} </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div>
          <p className="pvm">
            <strong>{t("sum")}: </strong>
            {bendraSuma}{" "}
          </p>
          <p className="pvm">
            <strong>{t("vat")} (21%): </strong>
            {PVM}{" "}
          </p>
          <p className="pvm">
            <strong>{t("sumVat")}: </strong>
            {bendraSumaSuPvm}
          </p>
        </div>

        <table className="line-items-container has-bottom-border">
          <thead>
            <tr>
              <th> {t("paymentInfo")} </th>
              <th> {t("paymentTerm")} </th>
              <th> {t("total")}: </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div style={{ textAlign: "left" }}>
                {t("accountNumber")}: <strong>123567744</strong>
                </div>
              </td>
              <td style={{ textAlign: "left" }}>
                <strong>2022-12-31</strong>
              </td>
              <td className="large total">{bendraSumaSuPvm} EUR</td>
            </tr>
          </tbody>
        </table>
        <p style={{ marginTop: "25px", fontSize: "14px" }}>{t("remarks")}: </p>
        <p style={{ marginTop: "75px", fontSize: "18px" }}>
        {t("invoiceIssuedBy")}: <strong>{user.name} {user.lastName}</strong>
        </p>
        <hr />
        <p style={{ marginTop: "25px", fontSize: "18px" }}>
          {t("invoiceReceivedBy")}:<strong>{customerId.vardas} {customerId.pavarde}</strong>
        </p>
        <hr />
      </div>
      <br />
    </div>
  );
};

export default InvoicePreview;
