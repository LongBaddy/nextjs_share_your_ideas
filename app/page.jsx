import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center green_gradient">
        Tell me


      </h1>
      
      <span className="subhead_text orange_gradient text-center">
        What you think about this page
      </span>



      <p className="desc text-center">
        Just share your thoughts about this page
      </p>

      <Feed />
    </section>
  )
}

export default Home