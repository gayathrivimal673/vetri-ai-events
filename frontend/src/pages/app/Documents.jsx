import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Documents.css";

function Documents() {
  const navigate = useNavigate();

  const [documents, setDocuments] = useState([
    {
      name: "Wedding Contract.pdf",
      type: "Contract",
      size: "2.4 MB",
      date: "28 Aug 2026",
    },
    {
      name: "Photography Package.pdf",
      type: "Photography",
      size: "1.8 MB",
      date: "30 Aug 2026",
    },
    {
      name: "Venue Agreement.pdf",
      type: "Venue",
      size: "3.1 MB",
      date: "01 Sep 2026",
    },
    {
      name: "Catering Menu.pdf",
      type: "Catering",
      size: "980 KB",
      date: "02 Sep 2026",
    },
  ]);

  const addDocument = () => {
    const name = prompt("Enter document name:");

    if (!name) return;

    setDocuments([
      ...documents,
      {
        name,
        type: "Other",
        size: "New",
        date: "Today",
      },
    ]);
  };

  return (
    <div className="documents-page">

      <div className="documents-header">
        <div>
          <span>EVENT DOCUMENTS</span>
          <h1>Documents</h1>
          <p>Manage contracts, agreements and event documents.</p>
        </div>

        <div className="documents-actions">
          <button
            className="doc-back-btn"
            onClick={() => navigate("/dashboard")}
          >
            ← Dashboard
          </button>

          <button
            className="upload-doc-btn"
            onClick={addDocument}
          >
            + Upload Document
          </button>
        </div>
      </div>

      {/* Stats */}

      <div className="document-stats">

        <div>
          <div className="doc-stat-icon">📄</div>
          <section>
            <small>Total Documents</small>
            <strong>{documents.length}</strong>
          </section>
        </div>

        <div>
          <div className="doc-stat-icon">📝</div>
          <section>
            <small>Contracts</small>
            <strong>2</strong>
          </section>
        </div>

        <div>
          <div className="doc-stat-icon">📸</div>
          <section>
            <small>Photography</small>
            <strong>1</strong>
          </section>
        </div>

        <div>
          <div className="doc-stat-icon">✓</div>
          <section>
            <small>Approved</small>
            <strong>3</strong>
          </section>
        </div>

      </div>

      {/* Documents */}

      <div className="documents-card">

        <div className="documents-card-header">
          <div>
            <h2>All Documents</h2>
            <p>Your event files and agreements</p>
          </div>

          <select>
            <option>All Types</option>
            <option>Contract</option>
            <option>Photography</option>
            <option>Venue</option>
            <option>Catering</option>
          </select>
        </div>

        <div className="documents-table">

          {documents.map((doc, index) => (
            <div className="document-row" key={index}>

              <div className="document-name">
                <div className="file-icon">📄</div>

                <div>
                  <strong>{doc.name}</strong>
                  <span>{doc.type}</span>
                </div>
              </div>

              <span>{doc.size}</span>

              <span>{doc.date}</span>

              <span className="approved">
                ✓ Approved
              </span>

              <button
                className="view-doc-btn"
                onClick={() => alert(`Opening ${doc.name}`)}
              >
                View
              </button>

            </div>
          ))}

        </div>

      </div>

      {/* Media */}

      <div className="media-section">

        <div className="media-heading">
          <div>
            <span>PHOTOGRAPHY INTEGRATION</span>
            <h2>Event Media</h2>
            <p>Store and manage your event photography and media.</p>
          </div>

          <button
            onClick={() => alert("Media upload coming next!")}
          >
            + Add Media
          </button>
        </div>

        <div className="media-grid">

          <div className="media-card media-one">
            <div>
              <span>ENGAGEMENT</span>
              <h3>Beautiful Beginnings</h3>
              <p>24 Photos</p>
            </div>
          </div>

          <div className="media-card media-two">
            <div>
              <span>MEHENDI</span>
              <h3>Colorful Moments</h3>
              <p>38 Photos</p>
            </div>
          </div>

          <div className="media-card media-three">
            <div>
              <span>WEDDING</span>
              <h3>The Big Day</h3>
              <p>126 Photos</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Documents;