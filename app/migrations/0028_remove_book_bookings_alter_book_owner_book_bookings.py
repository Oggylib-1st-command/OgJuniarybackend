# Generated by Django 4.2 on 2023-07-11 14:29

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0027_remove_book_bookings_book_bookings'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='book',
            name='bookings',
        ),
        migrations.AlterField(
            model_name='book',
            name='owner',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='book',
            name='bookings',
            field=models.ManyToManyField(blank=True, to='app.book', verbose_name='Бронь книги'),
        ),
    ]
