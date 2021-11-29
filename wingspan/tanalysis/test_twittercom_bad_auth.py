from django.test import TestCase
import os

from unittest.mock import patch # For python 2.x use from mock import patch
from .twittercom import TwitterCom
from testfixtures import LogCapture

class TwitterComBadAuth(TestCase):
    def setUp(self):
        del os.environ['API_KEY']
        del os.environ['API_SECRET']
        del os.environ['ACCESS_TOKEN']
        del os.environ['SECRET_ACCESS_TOKEN']

    @patch('tanalysis.test_twittercom_bad_auth')
    def test_logging_error(self, mock_logger):

        with LogCapture() as l:
            self.tcom = TwitterCom()
        l.check(
            ('root', 'ERROR', 'Authentication Error.'),
        )
       