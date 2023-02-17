import React, { useEffect, useState } from "react";
import css from "./MainContainer.module.scss";
import axios, { Axios } from "axios";
import DataTable from "react-data-table-component";
const MainContainer = () => {
  const [longurl, setLongurl] = useState("");
  const [shorturlid, setshorturlid] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openTable, setopenTable] = useState(false);
  const [datalist, setDataList] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios(
        `https://api.shrtco.de/v2/shorten?url=${longurl}`
      );
      setshorturlid(res.data.result.full_short_link);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (shorturlid != "") {
      addData();
    }
  }, [shorturlid]);


  const getData = () => {
    axios
      .get("https://crowded-pear-sock.cyclic.app/lists")
      .then((response) => {
        // handle success
        setDataList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addData = async () => {
    try {
      await axios.post("https://crowded-pear-sock.cyclic.app/create", {
        longurl: longurl,
        shorturlid: shorturlid,
        count: 0,
      });
      setDataList([
        ...datalist,
        {
          longurl: longurl,
          shorturlid: shorturlid,
          count: 0,
        },
      ]);
      setLongurl("");
    } catch (error) {
      console.log(error);
    }
  };


  const countNum = async (shorturlid) => {
    try {
      await axios.put("https://crowded-pear-sock.cyclic.app/updateurlcount", {
        shorturlid : shorturlid,
      });
    } catch (error) {
      console.log(error);
    }
  };


  const handleClick = async (e) => {
    if (!longurl) {
      return;
    }
    e.preventDefault();
    await fetchData();
    setOpen(true);
  };


  const columns = [
    {
      name: "LongURL",
      selector: (row) => row.longurl,
      sortable: true,
      subHeader: true,
      subHeaderAlign: "center",
    },
    {
      name: "ShorURL",
      selector: (row) => row.shorturlid,
      sortable: true,
      subHeader: true,
      subHeaderAlign: "center",
      cell: (row) => (
        <a
          href={row.shorturlid}
          target="_blank"
          onClick={() => countNum(row.shorturlid)}
        >
          {row.shorturlid}
        </a>
      ),
    },
    {
      name: "Count",
      selector: (row) => row.count,
      subHeader: true,
      subHeaderAlign: "right",
    },
  ];



  const customStyles = {
    rows: {
      style: {
        minHeight: "32px", 
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px",
        paddingRight: "8px",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px",
        paddingRight: "8px",
      },
    },
  };

  
  const showData = () => {
    setopenTable(!openTable)
    getData();
  }


  return (
    <section className={`paddings ${css.wrapper}`}>
      <div className={`flexCenter innerWidth ${css.container}`}>
        <span className={`primaryText yPaddings ${css.textD}`}>URL Shortener</span>
        <div className={css.fullText}>
          <input
            type="text"
            placeholder="Paste a link to shorten it"
            className={css.TextEdit}
            value={longurl}
            onChange={(e) => setLongurl(e.target.value)}
          />
          <button className={css.btn} onClick={handleClick}>
            CONVERT
          </button>
          <button className={css.btn2} onClick={showData} >SHOWURLALL</button>
        </div>
        {open && (
          <div style={{ marginTop: "20px" }} className={css.displayTOP}>
            {loading ? (
              "Looding"
            ) : (
              <>
                <span>SHOT URL :</span>
                <div className={css.displayURL}>
                  <a href={shorturlid} target="_blank">
                    <p>{shorturlid}</p>
                  </a>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {openTable && (
        <div className={`yPaddings`}>
          <p style={{ fontWeight: "bold", marginBottom: "20px" ,fontSize: "1.5rem"}}>DATAURL</p>
          {/* <p>{countURL}</p> */}
          <DataTable
            columns={columns}
            data={datalist}
            pagination
            customStyles={customStyles}
          />
        </div>
      )}
    </section>
  );
};

export default MainContainer;
