'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Images', [
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/memorial3.jpg', skateparkId: 1, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/memorial2.jpg', skateparkId: 1, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/memorial4.jpg', skateparkId: 1, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/Prairie+Grass+Skatepark1.jpg', skateparkId: 2, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/Prairie+Grass+Skatepark2.jpg', skateparkId: 2, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/goose1.jpg', skateparkId: 3, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/Metcalf+Skatepark.jpg', skateparkId: 4, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/metcalf2.jpg', skateparkId: 4, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/metcalf3.jpg', skateparkId: 4, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/manitou.jpg', skateparkId: 5, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/manitou1.jpg', skateparkId: 5, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/canoncity.jpg', skateparkId: 6, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/canoncity1.jpg', skateparkId: 6, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/pueblo1.jpg', skateparkId: 7, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/pueblo.jpg', skateparkId: 7, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/pueblo2.jpg', skateparkId: 7, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/frisco.jpg', skateparkId: 8, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/frisco2.jpg', skateparkId: 8, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/frisco3.jpg', skateparkId: 8, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/frisco4.jpg', skateparkId: 8, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/frisco5.jpg', skateparkId: 8, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/edwards.jpg', skateparkId: 9, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/edwards2.jpg', skateparkId: 9, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/edwards3.jpg', skateparkId: 9, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/railbender.jpg', skateparkId: 10, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/denver.jpg', skateparkId: 11, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/denver1.jpg', skateparkId: 11, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/denver3.jpg', skateparkId: 11, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/roxborough1.jpg', skateparkId: 12, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/roxborough.jpg', skateparkId: 12, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/B5720795-B306-49A6-8663-6C4FC3A4404A.jpeg', skateparkId: 13, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/119CDE9C-E440-4609-84F8-AE62332E367B.jpeg', skateparkId: 13, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/30D3C1A6-646B-48DF-A4ED-8260C55259E2.jpeg', skateparkId: 13, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/2FFCED70-694F-4EC1-946A-1ACF8B205A68.jpeg', skateparkId: 14, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/96E6F428-42F1-4C7A-858B-F4F8774A7A7A.jpeg', skateparkId: 14, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/B9006638-EA5E-4F09-95C6-855C43F774B8.jpeg', skateparkId: 14, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/CC88B3E5-53CC-4E16-A17F-84AEDB24EB28.jpeg', skateparkId: 14, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/CDDCC76F-BB59-426F-819D-AA24111F8909.jpeg', skateparkId: 14, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/EB6BE61E-FBFA-47B6-B0AA-475ED8B16A17.jpeg', skateparkId: 14, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/05A77F0C-3AEA-47FE-97C7-BA69BA612267.jpeg', skateparkId: 15, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/61F0C2A6-8C25-47CB-95EB-F44983D027B4.jpeg', skateparkId: 15, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/832020B9-BA84-40A1-BD26-480FFF789913.jpeg', skateparkId: 15, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/0A0982B1-AFCC-45D3-B502-6D7FA3394EC8.jpeg', skateparkId: 16, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/3561A7B1-8CB8-436F-A16E-52E4860CE781.jpeg', skateparkId: 16, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/54443A9E-A60E-4988-A9C3-437558867955.jpeg', skateparkId: 16, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/8428B740-B811-48B2-98E1-94B21FBCB8E6.jpeg', skateparkId: 16, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/C5E02555-14DE-445B-89DB-F1AE2B685CDE.jpeg', skateparkId: 17, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/1DF30EFF-11D9-4FF7-972E-DE9909145A23.jpeg', skateparkId: 17, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/BE0FCEB6-6154-4949-A9E5-659045879475.jpeg', skateparkId: 17, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/D9EE83C3-DB26-4733-A67C-61E5DAEEDD93.jpeg', skateparkId: 17, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/1803DF99-9C82-4202-82B5-4D92D552E9BA.jpeg', skateparkId: 18, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/1E84B4CD-377A-4ECD-9848-780C94FABE4B.jpeg', skateparkId: 18, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/68CD3C49-CF60-49A0-A9DB-463A9C5EAEE9.jpeg', skateparkId: 18, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/3B7415D1-D792-4AA8-AD80-1667CECBEEE6.jpeg', skateparkId: 19, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/666E8197-4A50-4E0F-B5CE-660AD295A90C.jpeg', skateparkId: 19, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/F075AB6B-EAEC-43B6-9A49-A005026A82B0.jpeg', skateparkId: 19, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/0A994C4C-F2C1-4750-BDA9-6AD9C129DD81.jpeg', skateparkId: 20, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/1976FA9A-09DB-44E1-89E9-16B3F45D14FD.jpeg', skateparkId: 20, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/AB1EB50C-7175-4551-A9BB-920CB9D8BFA0.jpeg', skateparkId: 20, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/D41CDA77-A7A6-485B-BCD2-3677C5628F65.jpeg', skateparkId: 20, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/F53B8893-4F2F-4DAA-AC03-CC00DE79002D.jpeg', skateparkId: 20, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/05EF8D4E-C75A-4B93-81E7-6F046ED70D99.jpeg', skateparkId: 21, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/31F0AB9A-FD3B-43D6-A255-720022C8084A.jpeg', skateparkId: 21, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/C85BFF85-87C2-4C9C-9224-063D8465082B.jpeg', skateparkId: 21, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/E19A780B-F548-4A7A-8333-7DEFCDFFE109.jpeg', skateparkId: 21, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/0419ADE5-818B-423B-B082-1C46F311B09A.jpeg', skateparkId: 22, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/0750F108-51E7-4E5D-8B38-523FF2BE5943.jpeg', skateparkId: 22, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/25DB6DF8-FA32-4F21-A50A-271272E16A38.jpeg', skateparkId: 22, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/5E8C8A6C-E76A-4EBD-883C-1C43573605A6.jpeg', skateparkId: 22, createdAt: new Date(), updatedAt: new Date() },
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Images', null, {});
  }
};