import { Link } from 'react-router-dom'
import { PATH } from '../../constants/path'

export default function TermsOfService() {
  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto', lineHeight: '1.6' }}>
      <h1>Terms of Service</h1>
      <p>Effective Date: September 20, 2025</p>

      <p>
        Welcome to <strong>Mira</strong>. These Terms of Service ("Terms") govern your access to and use of our
        application and related services. By accessing or using Mira, you agree to be bound by these Terms. If you do
        not agree, please discontinue use of our services immediately.
      </p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By registering, signing in with Google OAuth, or otherwise using Mira, you confirm that you are at least 13
        years old and capable of entering into a legally binding agreement.
      </p>

      <h2>2. Use of Service</h2>
      <ul>
        <li>You agree to use Mira only for lawful purposes.</li>
        <li>
          You will not misuse the service, attempt unauthorized access, or interfere with the normal operation of Mira.
        </li>
        <li>
          You are responsible for maintaining the confidentiality of your account and any activities under your account.
        </li>
      </ul>

      <h2>3. User Content</h2>
      <p>
        You retain ownership of the content you submit or upload to Mira. However, by using our services, you grant us a
        limited, non-exclusive, worldwide license to use, store, and process your content solely for the purpose of
        operating and improving Mira.
      </p>

      <h2>4. Privacy</h2>
      <p>
        Your use of Mira is also subject to our <Link to={PATH.PRIVACY_POLICY}>Privacy Policy</Link>, which explains how
        we collect, use, and protect your personal information. By using Mira, you consent to our data practices as
        described in the Privacy Policy.
      </p>

      <h2>5. Intellectual Property</h2>
      <p>
        All content, trademarks, logos, software, and design elements of Mira are the exclusive property of Mira, unless
        otherwise stated. You agree not to reproduce, distribute, or create derivative works without our explicit
        permission.
      </p>

      <h2>6. Limitation of Liability</h2>
      <p>
        Mira is provided on an “as is” and “as available” basis. We make no warranties, express or implied, regarding
        the reliability, availability, or suitability of our services. To the maximum extent permitted by law, Mira
        shall not be liable for any indirect, incidental, or consequential damages arising from your use of the service.
      </p>

      <h2>7. Indemnification</h2>
      <p>
        You agree to indemnify and hold Mira harmless from any claims, damages, liabilities, or expenses (including
        legal fees) arising out of your use of the services or violation of these Terms.
      </p>

      <h2>8. Termination</h2>
      <p>
        We reserve the right to suspend or terminate your account and access to Mira at our sole discretion, without
        prior notice, if you violate these Terms or misuse the service.
      </p>

      <h2>9. Changes to Terms</h2>
      <p>
        We may update these Terms from time to time. Any modifications will be posted on this page with an updated
        effective date. Continued use of Mira after changes indicates your acceptance of the revised Terms.
      </p>

      <h2>10. Governing Law</h2>
      <p>
        These Terms shall be governed by and construed in accordance with the laws of Vietnam, without regard to
        conflict of law principles.
      </p>

      <h2>11. Contact Us</h2>
      <p>If you have any questions about these Terms of Service, please contact us:</p>
      <ul>
        <li>Email: support@mira.io.vn</li>
        <li>Website: https://mira.io.vn</li>
      </ul>
    </div>
  )
}
