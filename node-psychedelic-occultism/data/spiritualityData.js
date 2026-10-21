const { slugify } = require('../middleware/slugMiddleware');

const spiritualityData = [
  {
    name: 'Christianity',
    defaultDescription: "...",
    relevantSourceSlugs: [
      'bible',
    ],
    significantQuotes: [],
    ideaExplorations: []
  },
  {
    name: 'Eastern Spirituality',
    defaultDescription: "...",
    relevantSourceSlugs: [
      'the-book-on-the-taboo-against-knowing-who-you-are',
      'the-wisdom-of-insecurity',
    ],
    significantQuotes: [],
    ideaExplorations: []
  },
  {
    name: 'Occultism',
    defaultDescription: "...",
    relevantSourceSlugs: [
      'the-book-of-the-law',
      'magick-without-tears',
    ],
    significantQuotes: [],
    ideaExplorations: []
  },
  {
    name: 'Psychedelics',
    defaultDescription: "...",
    relevantSourceSlugs: [
      'food-of-the-gods',
      'true-hallucinations',
      'the-psychedelic-experience',
      'politics-of-ecstasy',
      'programming-and-metaprogramming-in-the-human-biocomputer',
      'center-of-the-cyclone',
    ],
    significantQuotes: [],
    ideaExplorations: []
  }
]
//   {
//     name: 'Christianity',
//     defaultDescription: "Christianity centers on the life, teachings, death, and resurrection of Jesus Christ as the incarnate Son of God and the path to reconciliation with a personal, loving Creator. Core elements include faith in salvation through grace, the transformative work of the Holy Spirit, ethical living guided by love for God and neighbor, communal worship, scripture (especially the Bible), prayer, and sacraments like baptism and communion. Spiritual growth often involves becoming more like Christ, overcoming sin's effects, and participating in a redemptive relationship with God that promises eternal life.",
//     relevantSourceSlugs: ['bible'],
//     significantQuotes: [],
//     ideaExplorations: []
//   },
//   {
//     name: 'Eastern Spirituality',
//     defaultDescription: "Eastern Spirituality encompasses diverse traditions (such as Hinduism, Buddhism, Taoism, and Jainism) that emphasize inner realization, harmony with the cosmos, and liberation from suffering or illusion. Key concepts include karma (cause and effect across lives), dharma (righteous duty or natural order), samsara (cycle of rebirth), moksha/nirvana (enlightenment or release), non-duality (oneness of self and ultimate reality), mindfulness, meditation, yoga, and ethical living. Practices aim to cultivate awareness, dissolve ego-boundaries, and achieve profound insight into the interconnected nature of existence and the true self.",
//     relevantSourceSlugs: [],
//     significantQuotes: [],
//     ideaExplorations: []
//   },
//   {
//     name: 'Occultism',
//     defaultDescription: "Occultism refers to the study and practice of hidden or esoteric knowledge, often involving supernatural forces, symbolism, ritual, and personal empowerment beyond mainstream religion or science. It draws from traditions like Hermeticism, Kabbalah, alchemy, ceremonial magic, Thelema, and various mystery schools, emphasizing hidden correspondences in the universe (as above, so below), invocation of spirits or energies, divination (tarot, astrology), transformation of the self, and the acquisition of gnosis (direct experiential wisdom). Practitioners seek mastery over inner and outer realities through disciplined will, symbolism, and sometimes altered states.",
//     relevantSourceSlugs: [],
//     significantQuotes: [],
//     ideaExplorations: []
//   },
//   {
//     name: 'Psychedelics',
//     defaultDescription: "Psychedelics as a spiritual approach involve the intentional use of consciousness-expanding substances (such as psilocybin, LSD, ayahuasca, peyote, or DMT) to facilitate profound mystical experiences, ego dissolution, encounters with archetypal entities, unity with the cosmos, or direct insight into reality's nature. Often termed entheogenic ('generating the divine within'), this path draws from indigenous shamanic traditions, modern psychonaut exploration, and contemporary research into mystical-type experiences. It emphasizes set and setting, integration of insights, and potential for healing, expanded awareness, or spiritual awakening, though interpretations range from sacred sacrament to psychological tool.",
//     relevantSourceSlugs: [],
//     significantQuotes: [],
//     ideaExplorations: []
//   }
// ];

spiritualityData.forEach((item) => {
  item.slug = slugify(item.name);
});

module.exports = spiritualityData;
