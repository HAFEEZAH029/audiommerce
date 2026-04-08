
type BannerProps = {
  title: string;
};

const Banner = ({title}: BannerProps) => {
  return (
    <section style={{width: "100%", height: "250px", marginBottom: "6rem", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#000"}}>
      <p style={{fontSize: "2rem", color: "white", fontWeight: "bold"}}>{title}</p>
    </section>
  )
}

export default Banner
