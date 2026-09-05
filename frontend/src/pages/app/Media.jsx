import { useState } from "react";
import "./Media.css";

const mediaItems = [
  {
    title: "Wedding Highlights",
    type: "Photo",
    category: "Wedding",
    date: "18 Sep 2026",
    count: "124 Photos",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=900",
  },
  {
    title: "Engagement Moments",
    type: "Photo",
    category: "Engagement",
    date: "16 Sep 2026",
    count: "86 Photos",
    image:
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=900",
  },
  {
    title: "Reception Video",
    type: "Video",
    category: "Reception",
    date: "25 Sep 2026",
    count: "8 Videos",
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=900",
  },
  {
    title: "Event Decoration",
    type: "Photo",
    category: "Decoration",
    date: "18 Sep 2026",
    count: "64 Photos",
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=900",
  },
];

function Media() {
  const [filter, setFilter] = useState("All");

  const filteredMedia =
    filter === "All"
      ? mediaItems
      : mediaItems.filter((item) => item.type === filter);

  return (
    <div className="media-page">

      <div className="media-header">
        <div>
          <span className="media-label">EVENT MEDIA</span>
          <h1>Media Gallery</h1>
          <p>Manage event photos, videos and photography assets.</p>
        </div>

        <button
          className="upload-media-btn"
          onClick={() => alert("Media upload feature ready")}
        >
          + Upload Media
        </button>
      </div>

      <div className="media-stats">
        <div className="media-stat">
          <span>📸</span>
          <div>
            <strong>486</strong>
            <p>Total Photos</p>
          </div>
        </div>

        <div className="media-stat">
          <span>🎥</span>
          <div>
            <strong>24</strong>
            <p>Videos</p>
          </div>
        </div>

        <div className="media-stat">
          <span>☁️</span>
          <div>
            <strong>8.6 GB</strong>
            <p>Storage Used</p>
          </div>
        </div>

        <div className="media-stat">
          <span>✨</span>
          <div>
            <strong>12</strong>
            <p>Albums</p>
          </div>
        </div>
      </div>

      <div className="media-toolbar">
        <input
          type="text"
          placeholder="Search photos, videos or albums..."
        />

        <div className="media-filters">
          {["All", "Photo", "Video"].map((item) => (
            <button
              key={item}
              className={filter === item ? "active" : ""}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="media-grid">
        {filteredMedia.map((item, index) => (
          <div className="media-card" key={index}>

            <div className="media-image">
              <img src={item.image} alt={item.title} />

              <span className="media-type">
                {item.type === "Photo" ? "📸 Photo" : "🎥 Video"}
              </span>

              <button className="media-view">↗</button>
            </div>

            <div className="media-card-content">
              <div>
                <h3>{item.title}</h3>
                <p>{item.category}</p>
              </div>

              <strong>{item.count}</strong>
            </div>

            <div className="media-card-footer">
              <span>{item.date}</span>
              <button>⋯</button>
            </div>

          </div>
        ))}
      </div>

      <div className="media-storage">
        <div>
          <h3>Vetri Cloud Storage</h3>
          <p>Your event media is safely organized in one place.</p>
        </div>

        <div className="storage-right">
          <strong>8.6 GB / 20 GB</strong>
          <div className="storage-bar">
            <div />
          </div>
        </div>
      </div>

    </div>
  );
}

export default Media;