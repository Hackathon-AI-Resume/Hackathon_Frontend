import React, { memo } from 'react';

// 辅助函数
const ensureArray = (value) => (Array.isArray(value) ? value : []);
const isObjectMeaningful = (obj) =>
  obj && typeof obj === 'object'
    ? Object.values(obj).some(
        (v) =>
          v !== null &&
          v !== undefined &&
          v !== '' &&
          (Array.isArray(v) ? v.length > 0 : true)
      )
    : false;
const isArrayItemMeaningful = (item) =>
  item && typeof item === 'object'
    ? Object.values(item).some((v) => v !== null && v !== undefined && v !== '')
    : false;
const formatText = (text) => {
  if (text == null) return [];
  const normalizeToLines = (value) => {
    const out = [];
    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item == null) return;
        String(item)
          .split('\n')
          .forEach((l) => out.push(l));
      });
      return out;
    }
    return String(value).split('\n');
  };
  const lines = normalizeToLines(text);
  return lines.map((line, index) => (
    <React.Fragment key={index}>
      {line}
      {index < lines.length - 1 && <br />}
    </React.Fragment>
  ));
};

const ResumePreviewComponent = ({ data }) => {
  const {
    PersonalInfo = {},
    Summary = '',
    WorkExperience = [],
    Education = [],
    Projects = [],
    Skills = '',
    Certificates = [],
  } = data;

  const {
    firstName,
    lastName,
    jobTitle,
    city,
    country,
    phone,
    email,
    linkedin,
    portfolio,
    other,
  } = PersonalInfo;

  return (
    <div
      className="p-8 bg-white shadow-sm rounded overflow-auto font-sans text-gray-800"
      style={{
        width: '8.27in',
        height: '11.69in',
        margin: '0 auto',
        fontSize: '12px',
        boxSizing: 'border-box',
        lineHeight: '1.5',
      }}
    >
      {/* Header */}
      <header className="text-center pb-4 mb-6 border-b border-gray-400">
        <h1 className="text-3xl font-bold uppercase tracking-wide">
          {firstName || '[First Name]'} {lastName || '[Last Name]'}
        </h1>
        <h2 className="text-lg font-semibold text-gray-700 mb-1">
          {jobTitle || '[Job Title]'}
        </h2>
        <p className="text-sm text-gray-600">
          {city && country ? `${city}, ${country}` : city || country}
          {(phone || email || linkedin) && ' | '}
          {phone && `Tel: ${phone}`}
          {phone && (email || linkedin) && ' | '}
          {email && `Email: ${email}`}
          {email && linkedin && ' | '}
          {linkedin && `LinkedIn: ${linkedin}`}
          {(portfolio || other) && <br />}
          {portfolio && `Portfolio: ${portfolio}`}
          {portfolio && other && ' | '}
          {other && `Other: ${other}`}
        </p>
      </header>

      {/* Summary */}
      {Summary && (
        <section className="mb-5">
          <h3 className="text-lg font-semibold border-b border-gray-700 mb-2">
            Summary
          </h3>
          <p className="text-sm text-gray-700">{formatText(Summary)}</p>
        </section>
      )}

      {/* Experience */}
      {ensureArray(WorkExperience).length > 0 &&
        ensureArray(WorkExperience).some(isArrayItemMeaningful) && (
          <section className="mb-5">
            <h3 className="text-lg font-semibold border-b border-gray-700 mb-2">
              Experience
            </h3>
            {ensureArray(WorkExperience)
              .filter(isArrayItemMeaningful)
              .map((job, index) => (
                <div key={index} className="mb-3">
                  <div className="flex justify-between font-semibold text-sm">
                    <span>
                      {job.jobTitle || '[Job Title]'} at{' '}
                      {job.company || '[Company]'}
                    </span>
                    <span className="text-gray-600">
                      {job.startDate} - {job.endDate || 'Current'}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 mb-1">
                    {job.city && job.country
                      ? `${job.city}, ${job.country}`
                      : job.city || job.country}
                  </div>
                  <ul className="list-disc ml-5 text-sm text-gray-700">
                    {formatText(job.description || '').map(
                      (line, lineIndex) => (
                        <li key={lineIndex}>{line}</li>
                      )
                    )}
                  </ul>
                </div>
              ))}
          </section>
        )}

      {/* Education */}
      {ensureArray(Education).length > 0 &&
        ensureArray(Education).some(isArrayItemMeaningful) && (
          <section className="mb-5">
            <h3 className="text-lg font-semibold border-b border-gray-700 mb-2">
              Education
            </h3>
            {ensureArray(Education)
              .filter(isArrayItemMeaningful)
              .map((edu, index) => (
                <div key={index} className="mb-3">
                  <div className="flex justify-between font-semibold text-sm">
                    <span>{edu.institution || '[Institution]'}</span>
                    <span className="text-gray-600">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                  <div className="text-sm text-gray-700">
                    {edu.degree} in {edu.fieldOfStudy}{' '}
                    {edu.gpa && `(GPA: ${edu.gpa})`}
                  </div>
                  <div className="text-xs text-gray-600">
                    {edu.city && edu.country
                      ? `${edu.city}, ${edu.country}`
                      : edu.city || edu.country}
                  </div>
                </div>
              ))}
          </section>
        )}

      {/* Skills */}
      {Skills && (
        <section className="mb-5">
          <h3 className="text-lg font-semibold border-b border-gray-700 mb-2">
            Skills
          </h3>
          {(() => {
            const skillsString = Array.isArray(Skills)
              ? Skills.join(', ')
              : typeof Skills === 'string'
              ? Skills
              : String(Skills || '');
            const parts = skillsString
              .split(/, ?|\n/)
              .filter((s) => s && s.trim());
            return parts.length > 0 ? (
              <p className="text-sm text-gray-700">{parts.join(' | ')}</p>
            ) : null;
          })()}
        </section>
      )}

      {/* Projects */}
      {ensureArray(Projects).length > 0 &&
        ensureArray(Projects).some(isArrayItemMeaningful) && (
          <section className="mb-5">
            <h3 className="text-lg font-semibold border-b border-gray-700 mb-2">
              Projects
            </h3>
            {ensureArray(Projects)
              .filter(isArrayItemMeaningful)
              .map((project, index) => (
                <div key={index} className="mb-3">
                  <div className="flex justify-between font-semibold text-sm">
                    <span>
                      {project.projectName || '[Project Name]'}
                      {project.projectLink && (
                        <a
                          href={project.projectLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 text-blue-600 underline text-xs"
                        >
                          (Link)
                        </a>
                      )}
                    </span>
                    <span className="text-gray-600">
                      {project.startDate} - {project.endDate || 'Current'}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 mb-1">
                    {project.organization}
                  </div>
                  <p className="text-sm text-gray-700">
                    {formatText(project.description)}
                  </p>
                </div>
              ))}
          </section>
        )}

      {/* Certificates */}
      {ensureArray(Certificates).length > 0 &&
        ensureArray(Certificates).some(isArrayItemMeaningful) && (
          <section>
            <h3 className="text-lg font-semibold border-b border-gray-700 mb-2">
              Certificates
            </h3>
            {ensureArray(Certificates)
              .filter(isArrayItemMeaningful)
              .map((cert, index) => (
                <div key={index} className="mb-2">
                  <div className="flex justify-between font-semibold text-sm">
                    <span>{cert.name || '[Certificate Name]'}</span>
                    <span className="text-gray-600">
                      Issued: {cert.issueDate}{' '}
                      {cert.expirationDate && `(Expires: ${cert.expirationDate})`}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600">
                    {cert.issuingOrg}
                    {cert.credentialID && ` | ID: ${cert.credentialID}`}
                    {cert.credentialURL && (
                      <a
                        href={cert.credentialURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-blue-500 underline text-xs"
                      >
                        (Verify)
                      </a>
                    )}
                  </div>
                </div>
              ))}
          </section>
        )}
    </div>
  );
};

export default memo(ResumePreviewComponent);
