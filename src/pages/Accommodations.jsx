import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';

const Section = styled.section`
  background: ${({ theme }) => theme.colors.blanc};
  min-height: 70vh;
  padding: 2.5rem 1rem 3rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 600px) {
    padding: 1.2rem 1.5rem 2rem 1.5rem;
  }
`;
const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.accent};
  color: ${({ theme }) => theme.colors.terracotta};
  font-size: 2.6rem;
  margin-bottom: 1.5rem;
`;
const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 2.5rem;
  justify-content: center;
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 1.2rem;
    align-items: center;
  }
`;
const Item = styled.li`
  background: ${({ theme }) => theme.colors.ivoire};
  border-radius: 18px;
  box-shadow: 0 2px 8px rgba(90,60,40,0.07);
  width: 320px;
  height: 380px;
  padding: 0rem 0rem 1rem 0rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 600px) {
    width: 90vw;
    height: 52vh;
    padding: 0rem 0rem;
  }
`;
const SliderWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  height: 100%;
  position: relative;
  margin-bottom: 1rem;
  overflow: hidden;
  @media (max-width: 600px) {
    max-width: 98vw;
    height: 60vw;
  }
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 14px;
  position: absolute;
  top: 0; left: 0;
  opacity: 0;
  z-index: 1;
  transition: opacity 0.3s, transform 0.5s cubic-bezier(.4,0,.2,1);

  /* Default: off-screen */
  transform: ${({ direction, $active, $hovered }) =>
    $active
      ? `translateX(0) scale(${$hovered ? 1.07 : 1})`
      : direction === 'left'
      ? 'translateX(-100%) scale(1)'
      : 'translateX(100%) scale(1)'
  };

  &.active {
    opacity: 1;
    z-index: 2;
  }
  &.prev {
    opacity: 0;
    z-index: 1;
  }
`;
const Dots = styled.div`
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 0.7rem;
  z-index: 3;
`;
const Dot = styled.button`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: none;
  background: ${({ active, theme }) => active ? theme.colors.terracotta : '#ddd'};
  cursor: pointer;
  padding: 0;
  transition: background 0.2s, transform 0.2s;
  ${({ active }) => active && css`transform: scale(1.2); box-shadow: 0 0 0 2px #D0816133;`}
`;
const Name = styled.div`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.marronFonce};
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
`;
const Price = styled.div`
  color: ${({ theme }) => theme.colors.caramel};
  font-size: 1.15rem;
  margin-bottom: 0.3rem;
`;
const Distance = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.terracotta};
  font-size: 1.1rem;
  margin-bottom: 0.6rem;
`;
const LinkBtn = styled.a`
  background: ${({ theme }) => theme.colors.terracotta};
  color: ${({ theme }) => theme.colors.blanc};
  border-radius: 10px;
  padding: 0.9rem 1.4rem;
  text-decoration: none;
  font-size: 1.15rem;
  margin-top: 0.7rem;
  transition: background 0.2s;
  &:hover {
    background: ${({ theme }) => theme.colors.caramel};
  }
`;
const Arrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255,255,255,0.85);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.terracotta};
  z-index: 3;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.85;
  transition: background 0.2s, opacity 0.2s;
  &:hover {
    background: ${({ theme }) => theme.colors.terracotta};
    color: #fff;
    opacity: 1;
  }
  left: ${({ left }) => left ? '8px' : 'auto'};
  right: ${({ right }) => right ? '8px' : 'auto'};
`;

const hotels = [
  {
    name: 'LA ROCHELLE HOTEL',
    images: [
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/334768062.jpg?k=48ed4fbdc5ad513df36cdcdef4bd3b37d5490643019b23a265f1db94f229b2ee&o=',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/334318104.jpg?k=acde9c6645e04fe54bbcd9bf8bcc3f4dd370b1daa664127efb6cc17ab2a648a6&o=',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/334317094.jpg?k=480f3900ca63c3cb37499bc3c92be2e7f4bff80b783a2eb0381bcbad357725df&o=',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/517600328.jpg?k=86d3df9e019a73a9ef7e078e0b04fe2566b2d57a91fb3878b7f5dd6ba8a6f293&o=',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/334318130.jpg?k=44c119f7ac9cf477f67de8f3bf14dd2382cc1c8cc1a68afad6c504b26be799d5&o=',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/334318119.jpg?k=3f7979d6a619c562fc4679c7e2c52e846ca323a23e02638d925591a668afb40c&o=',
    ],
    price: '~ € 47 / Tarif du jour',
    distance: 'Avenue de la République, Yaoundé',
    link: 'https://www.booking.com/hotel/cm/la-rochelle-yaounde.fr.html?aid=318615&label=New_French_FR_FR_21427169785-Jt2Do6A%2A80cSmr5wOnHnTgSM217289923597%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg-Share-tzTVTH%401751354150&sid=d3bb86a99d7b38417a407813d9dff63b&all_sr_blocks=809763401_382883564_2_42_0&checkin=2025-07-02&checkout=2025-07-03&dest_id=-3160026&dest_type=city&dist=0&group_adults=2&group_children=0&hapos=1&highlighted_blocks=809763401_382883564_2_42_0&hpos=1&matching_block_id=809763401_382883564_2_42_0&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&sr_pri_blocks=809763401_382883564_2_42_0__3078000&srepoch=1751502945&srpvid=d5b2042e6fb001c3&type=total&ucfs=1&',
  },
  {
    name: "ROS’APPART",
    images: [
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/643702953.jpg?k=8443241d453189e382f2bdf1b9c80d11ef40f65576bb3e3c49c0da33661a6d9a&o=',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/643701125.jpg?k=8d2cfe08374204b78090ebb50c5473078dc5d866381c674234d6dfe37981e35d&o=',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/643701816.jpg?k=0ced524cac921bc6e24ccd354d5c88d1e23e1db293dfc4001cd2175c37d91821&o=',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/384339670.jpg?k=16dea6f358050950b4a15ccfec9ed6b3ff88e3c4f0ef1630ed90f5479ac2e45f&o=',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/384336126.jpg?k=1b26d053027a4c5e2572708e48ed0687c0dd046c510aa0a1362b4b9eff85cac0&o=',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/384336051.jpg?k=fefc8679c3d1601b0b4c38498bd6bfbf839821b8a1d8cfe7fd3959194cc2d283&o=',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/384336108.jpg?k=c13c5bbad581ff72d6f57b545a4c6c7d15e8489cedebdd9662e3df8641c26c0c&o=',
    ],
    price: '~ € 64 / nuit',
    distance: 'Rue ceper, Yaoundé',
    link: 'https://www.booking.com/hotel/cm/ros-appart.fr.html?aid=318615&label=New_French_FR_FR_21427169785-Jt2Do6A%2A80cSmr5wOnHnTgSM217289923597%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg-Share-VRU6MC4%401751354184&sid=d3bb86a99d7b38417a407813d9dff63b&checkin=2025-07-02&checkout=2025-07-03&dest_id=-3160026&dest_type=city&dist=0&group_adults=2&group_children=0&hapos=1&hpos=1&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&soh=1&sr_order=popularity&srepoch=1751503367&srpvid=f0810500209b0047&type=total&ucfs=1&#no_availability_msg',
  },
  {
    name: 'Hôtel Jouvence International',
    images: [
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/277931351.jpg?k=a90e9617c2c960c04a4fe63e894c0c6c48aa00830089045d40703a68c010a95e&o=',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/277931364.jpg?k=1815bc8b149ce815ee17bce358851dcb73c021698f86627ff6b0d8f5070f5bd4&o=',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/425467893.jpg?k=47872684212320e402c033320728c0c3cd74317f4daea7833f981a84bf1a7c3f&o=',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/284055969.jpg?k=64a40669826bea39ab5eedc2c157198ae42c41094824cc821fd910c4a5e561a2&o=',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/277931318.jpg?k=d68b58373f1a4c4b43fb1d26a58dd721ce5287feee6ba8ec5846a00b4795531c&o=',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/277935797.jpg?k=6c4a971580143eada3a86dfc069267be82769b74019c51d341ff8193313503b4&o=',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/277931359.jpg?k=3075f7f6dd87d41d512eb65e95361c0aad80bc187f138418fb5a93b8c6c82e17&o=',
    ],
    price: '~ € 86 / Tarif du jour',
    distance: 'Avenue Marcel Marigoh Mboua',
    link: 'https://www.booking.com/hotel/cm/jouvence-international-yaounde.fr.html?aid=318615&label=New_French_FR_FR_21427169785-Jt2Do6A%2A80cSmr5wOnHnTgSM217289923597%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg-Share-HJaEOv%401751354130&sid=d3bb86a99d7b38417a407813d9dff63b&all_sr_blocks=691693601_335452770_2_2_0&checkin=2025-07-02&checkout=2025-07-03&dest_id=-3160026&dest_type=city&dist=0&group_adults=2&group_children=0&hapos=1&highlighted_blocks=691693601_335452770_2_2_0&hpos=1&matching_block_id=691693601_335452770_2_2_0&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&sr_pri_blocks=691693601_335452770_2_2_0__5630400&srepoch=1751502523&srpvid=c826035b430d034b&type=total&ucfs=1&',
  },
  {
    name: 'Riad Prince Louis',
    images: [
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/687961384.jpg?k=86283aa2d394a079729cbd666f1b033b71e59140de4d194bf289eb35ceb10958&o=',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/491178669.jpg?k=41668eac184871240089e04732fd7cd67fd332c615a8044bae4c48c77a77aaa5&o=',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/491178632.jpg?k=dcb14a5d3be2944561a52c7fe29785aabada53ba29cf6ce8eded63a941bd8d83&o=',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/491178636.jpg?k=d8e13dcdf870e7896d0e6d0a0d08317174ce39be65b67e9edb449efb47d3f6b4&o=',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/491178659.jpg?k=faed3aa4eda81e4fe945de53ca11398763cc7de71306922e3e972ecc7c156494&o=',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/687968826.jpg?k=8ffffe1b2b45a7b409bc711eba833e6f392431919d339f23fa53c6021babe3fe&o=',
    ],
    price: '~ € 91 / Tarif du jour',
    distance: "O'markit Centre ville, Yaoundé",
    link: 'https://www.booking.com/hotel/cm/riad-prince-louis.fr.html?aid=318615&label=New_French_FR_FR_21427169785-Jt2Do6A%2A80cSmr5wOnHnTgSM217289923597%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg-Share-f1FhNVZ%401751354049&sid=d3bb86a99d7b38417a407813d9dff63b&all_sr_blocks=1058826901_378137979_2_0_0&checkin=2025-07-02&checkout=2025-07-03&dest_id=-3160026&dest_type=city&dist=0&group_adults=2&group_children=0&hapos=1&highlighted_blocks=1058826901_378137979_2_0_0&hpos=1&matching_block_id=1058826901_378137979_2_0_0&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&sr_pri_blocks=1058826901_378137979_2_0_0__6000000&srepoch=1751489213&srpvid=2b51921c2bf90655&type=total&ucfs=1&',
  },
  {
    name: 'Best Lifestyle Home hippodrome',
    images: [
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/643932956.jpg?k=ad154ecd5030c92e62954ede1e8aac09731d847492e0206df1342be589c443e2&o=',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/655076459.jpg?k=6affd9f51bf03ab38b2218d73f6cc7233c8fcc6af1f4dc5e634c7baa849db6f6&o=',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/655076545.jpg?k=f26c334aa3878c66b817401912d00ed79ce4d7c8d87e3613b0a6736d7279455a&o=',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/655076113.jpg?k=14a652459b684441a3fa3d9756a040aa7b6c04648f8e351e084f6722da13b57a&o=',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/655076219.jpg?k=a346cb44536a049c362836ac8fa82ca08a48dd05de9a15fb152ccc0205b41db3&o=',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/655076468.jpg?k=0954378f3228505fbc759c600ac7b76506ea754f09faa86799224343d0ca25ef&o=',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/655076508.jpg?k=c59a74b426afb77b6c31eff9694fba73aef316904be79f735df29d652dcbd53a&o=',
    ],
    price: '~ € 152 / Tarif du jour',
    distance: "Avenue De L'Indépendance, Yaoundé",
    link: 'https://www.booking.com/hotel/cm/best-lifestyle-home-hippodrome.fr.html?aid=318615&label=New_French_FR_FR_21427169785-Jt2Do6A%2A80cSmr5wOnHnTgSM217289923597%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg-Share-lsXuL6D%401751354085&sid=d3bb86a99d7b38417a407813d9dff63b&all_sr_blocks=1354093001_414397094_6_0_0&checkin=2025-07-02&checkout=2025-07-03&dest_id=-3160026&dest_type=city&dist=0&group_adults=2&group_children=0&hapos=1&highlighted_blocks=1354093001_414397094_6_0_0&hpos=1&matching_block_id=1354093001_414397094_6_0_0&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&sr_pri_blocks=1354093001_414397094_6_0_0__10000000&srepoch=1751489714&srpvid=127e93165f3b0675&type=total&ucfs=1&',
  },  
  {
    name: 'Hotel Franco Yaounde',
    images: [
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/389476040.jpg?k=4ec7354f6d4003e8a99671cde1527a08013adf0cec5ad1d8383760ffa15b7a3f&o=',
      '/1000235346.jpg',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/388743901.jpg?k=94500cde4cc56dd3c1fc9ff55a06f3261fffb7b9d6c41459ddfe26ce1c9f618c&o=',
       '/1000235325.jpg',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/352161235.jpg?k=e810dbfd787a8f902370fb190444acafb54a0150e3bf61f99494d5ae6243e9f8&o=',
      '/1000235345.jpg',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/387209791.jpg?k=79abc3a2908bfbb76cde6a151f04884908730a8978dd6c839db6058c1e323ad3&o='
    ],
    price: '~ € 117 / Tarif du jour',
    distance: 'Rue Onembele Nkou, Nlongkak, 14304 Yaoundé',
    link: 'https://www.booking.com/hotel/cm/franco-yaounde.html?ssne=Yaoundé&ssne_untouched=Yaoundé&highlighted_hotels=1057178&ss=Yaoundé&dest_id=-3160026&dest_type=city&hp_avform=1&origin=hp&do_availability_check=1&label=franco-yaounde-Rcoem0PCTTHxMv67jBIikQSM434496238530%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atikwd-29631976681%3Alp9197363%3Ali%3Adem%3Adm%3Appccp%3DUmFuZG9tSVYkc2RlIyh9YWiN3YY6Tdistu3PpCLSviE&sid=b5d440ccdde1f4773b10ebe5461fe43c&aid=311089&lang=fr&sb=1&src_elem=sb&src=hotel&checkin=2025-08-15&checkout=2025-08-16&group_adults=1&no_rooms=1&group_children=0#availability_target',
  },
  {
    name: 'Les Résidences de la Providence',
    images: [
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/508345407.jpg?k=1a10c740949575ca28d40538b7f04a135e3f90352fb8f9a664de9ad129245bfb&o=',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/508330057.jpg?k=36ba12cbacd2aedbe3d05b2737dee7f353c64ad06af6e41325479e18b89e9876&o=',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/508349364.jpg?k=2569a0598b51071e51a1468465e0b7b25c69954002625b7c2be6002cac2e323b&o=',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/508390723.jpg?k=f4a1dbe1185064ffcabb6509f4b755ba1029ac4c4e4ac1e244583b3eb8f29340&o=',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/281556011.jpg?k=ecc9bb33390d93b6184a57abc93fcb04e1e6f6ffb6312f6cb39f71f91935cce6&o=',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/280196707.jpg?k=5a0abd04f2e76ef74621386a908d425a8bf7a2d8d9c479acd7a9a6ded73dfb70&o=',
    ],
    price: 'Voir détails',
    distance: 'Rue Djoungolo Residences de la Providence, pres du CODEV',
    link: 'https://share.google/HxwHPpt3b7C7WPNWW',
  },
  {
    name: 'Albatros Premium Hôtel',
    images: [
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/645500271.jpg?k=982301ad588101ce6dd68f796353f6c5e7c622a2015d6e116a9db874d68b0fa1&o=',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/644918278.jpg?k=d061f277a91a06672109ca6db34752856500b420f89d5010f6e6c70cd27e35ab&o=',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/645460910.jpg?k=48bf411f2ab9dd9cacb8d8ddf1bfbbf542417a978ae91d3f339b4f518edbed84&o=',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/645819888.jpg?k=8ddf121143c6b671c5e91882c0a48b07c287239a935004d4355bd682a69ef8b0&o=',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/645819889.jpg?k=2e7eda0bd1d7386cd487a1c03ce7e566c84066f02598d79f4dfee3c3e598bcb4&o=',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/645458909.jpg?k=e65b1c4b4019852ba34af257c0ec6af41e0d84d822576e10911bcd02474bff39&o=',
    ],
    price: 'Voir détails',
    distance: "203, Boulevard de l'OCAM, Rue 4.017",
    link: 'https://share.google/0IxdC0cQwflCVQOqT',
  },
];

function HotelSlider({ images }) {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [direction, setDirection] = useState('left');
  const timerRef = useRef();
  const [auto, setAuto] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!auto) return;
    timerRef.current = setInterval(() => {
      setPrevIndex(index);
      setDirection('left');
      setIndex(i => (i + 1) % images.length);
    }, 2000);
    return () => clearInterval(timerRef.current);
  }, [index, images.length, auto]);

  const goTo = (i) => {
    setPrevIndex(index);
    setDirection(i > index ? 'left' : 'right');
    setIndex((i + images.length) % images.length);
  };
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  // For mobile: start auto on touch, stop on touch end
  const handleTouchStart = () => setAuto(true);
  const handleTouchEnd = () => setAuto(false);

  return (
    <SliderWrapper
      onMouseEnter={() => { setAuto(true); setHovered(true); }}
      onMouseLeave={() => { setAuto(false); setHovered(false); }}
      onTouchStart={() => { setAuto(true); setHovered(true); }}
      onTouchEnd={() => { setAuto(false); setHovered(false); }}
    >
      <Arrow left onClick={prev} aria-label="Image précédente">&#8592;</Arrow>
      <Arrow right onClick={next} aria-label="Image suivante">&#8594;</Arrow>
      {images.map((src, i) => (
        <Img
          key={src}
          src={src}
          alt="Hôtel"
          className={i === index ? 'active' : i === prevIndex ? 'prev' : ''}
          direction={direction}
          $active={i === index}
          $hovered={hovered && i === index}
          style={{ transitionDelay: i === index ? '0s' : '0s' }}
        />
      ))}
      <Dots>
        {images.map((_, i) => (
          <Dot key={i} active={i === index} onClick={() => goTo(i)} aria-label={`Voir l'image ${i+1}`}/>
        ))}
      </Dots>
    </SliderWrapper>
  );
}

const Accommodations = () => (
  <Section>
    <Title>Hébergements à proximité</Title>
    <List>
      {hotels.map(hotel => (
        <Item key={hotel.name}>
          <HotelSlider images={hotel.images} />
          <Name>{hotel.name}</Name>
          <Price>{hotel.price}</Price>
          <Distance>{hotel.distance}</Distance>
          <LinkBtn href={hotel.link} target="_blank" rel="noopener noreferrer">Voir</LinkBtn>
        </Item>
      ))}
    </List>
  </Section>
);

export default Accommodations; 