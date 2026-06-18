const fs = require('fs');

const path = 'Frontend/src/pages/ContentManagementPage.jsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add imports
content = content.replace(
  "import { getHomepageContent, createHomepageContent, updateHomepageContent } from '../services/cms.service';",
  "import { getHomepageContent, createHomepageContent, updateHomepageContent, getServicesPageContent, createServicesPageContent, updateServicesPageContent } from '../services/cms.service';"
);

// 2. Fetch data
content = content.replace(
  "const [homepageRes, servicesRes, statsRes] = await Promise.all([",
  "const [homepageRes, servicesRes, statsRes, servicesPageRes] = await Promise.all(["
);
content = content.replace(
  "getStatistics().catch(() => [])",
  "getStatistics().catch(() => []),\n        getServicesPageContent().catch(() => null)"
);
content = content.replace(
  "const homepage = homepageRes || {};",
  "const homepage = homepageRes || {};\n      const servicesPageContent = servicesPageRes || {};"
);

// 3. Set data in state
content = content.replace(
  "services: {",
  "servicesPageId: servicesPageContent.id || null,\n        services: {"
);
content = content.replace(
  "sectionDescription: homepage.servicesSectionDescription || '',",
  "sectionDescription: homepage.servicesSectionDescription || '',\n          heroLabel: servicesPageContent.heroLabel || '',\n          heroTitle: servicesPageContent.heroTitle || '',\n          heroDescription: servicesPageContent.heroDescription || '',\n          servicesNavigatorTitle: servicesPageContent.servicesNavigatorTitle || '',"
);

// 4. Save handler
const saveServicesReplacement = `
      const metaPayload = {
        servicesSectionTitle: sectionData.sectionTitle,
        servicesSectionDescription: sectionData.sectionDescription,
      };
      
      const pagePayload = {
        heroLabel: sectionData.heroLabel,
        heroTitle: sectionData.heroTitle,
        heroDescription: sectionData.heroDescription,
        servicesNavigatorTitle: sectionData.servicesNavigatorTitle,
      };

      if (contentData.homepageId) {
        await updateHomepageContent(contentData.homepageId, metaPayload);
      } else {
        await createHomepageContent(metaPayload);
      }
      
      if (contentData.servicesPageId) {
        await updateServicesPageContent(contentData.servicesPageId, pagePayload);
      } else {
        await createServicesPageContent(pagePayload);
      }
`;

content = content.replace(
  /const metaPayload = \{\s*servicesSectionTitle: sectionData\.sectionTitle,\s*servicesSectionDescription: sectionData\.sectionDescription,\s*\};\s*if \(contentData\.homepageId\) \{\s*await updateHomepageContent\(contentData\.homepageId, metaPayload\);\s*\} else \{\s*await createHomepageContent\(metaPayload\);\s*\}/s,
  saveServicesReplacement
);

fs.writeFileSync(path, content);
console.log('ContentManagementPage.jsx updated');
