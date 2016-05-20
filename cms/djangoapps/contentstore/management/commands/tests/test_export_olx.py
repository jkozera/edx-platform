"""
Tests for exporting OLX content.
"""
import unittest
import shutil
import ddt
from django.core.management import CommandError, call_command

from xmodule.modulestore.tests.factories import CourseFactory
from xmodule.modulestore import ModuleStoreEnum
from xmodule.modulestore.tests.django_utils import ModuleStoreTestCase
from xmodule.modulestore.django import modulestore


class TestArgParsingCourseExportOlx(unittest.TestCase):
    """
    Tests for parsing arguments for the `export_olx` management command
    """
    def setUp(self):
        super(TestArgParsingCourseExportOlx, self).setUp()

    def test_no_args(self):
        """
        Test export command with no arguments
        """
        errstring = "Insufficient arguments"
        with self.assertRaisesRegexp(CommandError, errstring):
            call_command('export_olx')


@ddt.ddt
class TestCourseExportOlx(ModuleStoreTestCase):
    """
    Test exporting a course
    """
    def setUp(self):
        super(TestCourseExportOlx, self).setUp()

    @ddt.data(ModuleStoreEnum.Type.mongo, ModuleStoreEnum.Type.split)
    def test_export_course_with_directory_name(self, store):
        """
        Create a new course try exporting in a path specified
        """
        course = CourseFactory.create(default_store=store)
        course_id = unicode(course.id)
        self.assertTrue(
            modulestore().has_course(course.id),
            "Could not find course in {}".format(store)
        )

    def test_invalid_course_key(self):
        """
        Test export command with an invalid course key.
        """
        errstring = "Unparsable course_id"
        with self.assertRaisesRegexp(CommandError, errstring):
            call_command('export_olx', 'InvalidCourseID', 'dummy_output_path')

    def test_missing_argument(self):
        """
        Test export command with a valid course key but no filename.
        """
        errstring = "Insufficient arguments"
        with self.assertRaisesRegexp(CommandError, errstring):
            call_command('export_olx', 'x/y/z')

    def test_course_key_not_found(self):
        """
        Test export command with a valid course key that doesn't exist.
        """
        errstring = "Invalid course_id"
        with self.assertRaisesRegexp(CommandError, errstring):
            call_command('export_olx', 'x/y/z', 'dummy_output_path')
