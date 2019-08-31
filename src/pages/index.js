import React from "react"
import Header from "../components/Header"
import FeaturedProject from "../components/FeaturedProject"
import { Title, Paragraph } from "../components/Typography"
import OtherProject from "../components/OtherProject"
import { Box, Flex } from "rebass"
import Navigation from "../components/Navigation"
import DefaultLayout from "../components/Layouts/Default"

const IndexPage = () => {
  return (
    <DefaultLayout>
      <Navigation />

      <Box as="main" id="main-content" mb={[5, 6]}>
        <div mt={9}>
          <Header>
            <Title mt={9}>
              Make things
              <br />
              better together.
            </Title>

            <Paragraph maxWidth="90%" fontSize={[2, 3]} mt={[5]} mb={4}>
              Torquatos nostros? quos dolores eos, qui haec putat, ut alterum
              esse ratione neque. Ut placet, inquam tum dicere exorsus est
              laborum et argumentandum et accusamus et.
            </Paragraph>
          </Header>

          <main>
            <FeaturedProject
              title="Recently, I design a bike sharing system, BukaBike. A cheaper, faster,
          and more flexible transport."
              description="Et quidem exercitus quid ex ea quid et impetus quo quaerimus, non fuisse
          torquem detraxit hosti et quidem faciunt, ut aut voluptates repudiandae
          sint."
              link="/bukabike/"
              image="assets/bukabike.jpg"
            />

            <FeaturedProject
              title="I also help empower small fashion and apparel brands by radically improving the way they collaborate."
              description="Quid ex eo est consecutus? laudem et via procedat oratio quaerimus igitur, quid malum, sensu iudicari, sed ipsius honestatis decore laudandis, id omnia."
              link="/bukabike/"
              image="assets/cocare.png"
            />

            <FeaturedProject
              title="As a designer who codes, I developed tools for designers to support their workflows."
              description="Tum dicere exorsus est primum igitur, inquit, sic agam, ut alterum aspernandum sentiamus alii autem, quibus ego cum teneam sententiam, quid malum. "
              link="/bukabike/"
              image="assets/design-tools.png"
              mb="114px"
            />

            <OtherProject />
          </main>
        </div>
      </Box>
    </DefaultLayout>
  )
}

export default IndexPage
